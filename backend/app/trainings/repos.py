import uuid
import datetime
from typing import List

from sqlalchemy import text, or_, and_, desc, delete
from sqlalchemy.future import select
from sqlalchemy.orm import joinedload, selectinload, load_only
from pydantic import parse_obj_as

from app.database import BaseSqlAlchemyRepo
from app.auth.models import User
from app.trainers.interfaces import ICheckStudentsTrainersRepo
from app.schemas import BaseError
from .interfaces import ITrainingsRepo
from .models import ExerciseInTraining, Training, Exercise
from .schemas import TrainingRead, ExerciseRead, ExerciseCreate, ExerciseAdd, TrainingCreate, ExerciseInTrainingRead, TrainingFinish





class TrainingsRepo(BaseSqlAlchemyRepo, ITrainingsRepo): 
	def _convert_training(self, training: Training) -> TrainingRead:
		exercises = list(map(lambda i: ExerciseInTrainingRead(
			id=i.id,
			exercise_id = i.exercise.id, 
			name=i.exercise.name,
			description=i.exercise.description,
			weight=i.weight,
			sets=i.sets,
			repetitions=i.repetitions,
			rest_time=i.rest_time,
			created_at=i.created_at
		), training.exercises))
		exercises = sorted(exercises, key=lambda x: x.created_at)
		return TrainingRead(
			id=training.id, 
			name=training.name, 
			datetime=training.created_at, 
			exercises=exercises, 
			is_finished=training.is_finished, 
			finishing_time=training.finishing_time, 
			span=training.span
		)

	async def create_exercise(self, user_id: uuid.UUID, exercise: ExerciseCreate) -> str:
		new_exercise = Exercise(owner_id=user_id, name=exercise.name, description=exercise.description)
		self._session.add(new_exercise)
		await self._session.flush()
		await self._session.commit()
		return "successful"

	async def get_exercises(self, user_id: uuid.UUID, name: str, amount: int = 10) -> list[ExerciseRead]:
		query = (
			select(Exercise)
			.where(Exercise.owner_id==user_id)
			.filter(Exercise.name.ilike("%"+name+"%"))
			.limit(amount)
		)
		exercises = await self._session.scalars(query)
		exercises = exercises.unique().all()
		exercises = list(map(lambda i: ExerciseRead(id=i.id, name=i.name, description=i.description), exercises))
		return exercises

	async def create_user_training(self, user_id: uuid.UUID, training: TrainingCreate) -> str:
		new_training = Training(owner_id=user_id, name=training.name, created_at=training.date)
		self._session.add(new_training)
		await self._session.flush()
		await self._session.commit()
		return "successful"

	async def delete_user_training(self, user_id: uuid.UUID, training_id: uuid.UUID) -> str:
		query = (
			delete(Training)
			.where(Training.owner_id == user_id)
			.where(Training.id == training_id)
		)
		await self._session.execute(query)
		await self._session.commit()
		return "successful"

	async def finish_training(self, user_id: uuid.UUID, training: TrainingFinish) -> str:
		try:
			my_training = await self._session.execute(select(Training).where(Training.id==training.id).where(Training.owner_id==user_id))
			my_training = my_training.scalar_one()
			my_training.is_finished = True
			my_training.finishing_time = training.finishing_time
			my_training.span = training.span
			await self._session.flush()
			await self._session.commit()
			return "successful"
		except:
			return "not found"

	#do not check for exercises becasue they are not important
	async def add_exercise(self, user_id: uuid.UUID, exercise: ExerciseAdd, trainers_repo: ICheckStudentsTrainersRepo) -> str: 
		try:
			my_training = await self._session.execute(select(Training).where(Training.id==exercise.training_id))
			my_training = my_training.scalar_one()
			if not await trainers_repo.check_trainer(user_id, my_training.owner_id): return BaseError(status=403, detail="Forbidden")
		except: 
			return BaseError(status=400, detail="The triaing does not exist")
		new_exercise = ExerciseInTraining(
			training_id=exercise.training_id, 
			exercise_id=exercise.exercise_id,
			weight=exercise.weight,
			sets=exercise.sets,
			repetitions=exercise.repetitions,
			rest_time=exercise.rest_time
		)
		self._session.add(new_exercise)
		await self._session.flush()
		await self._session.commit()
		return "successful"

	async def remove_exercise(self, user_id: uuid.UUID, exercise_id: uuid.UUID, trainers_repo: ICheckStudentsTrainersRepo) -> str:
		exercise_in_training = (
			await self._session.execute(
				select(ExerciseInTraining)
				.options(joinedload(ExerciseInTraining.training))
				.where(ExerciseInTraining.id == exercise_id)
			)
		).scalar()
		
		if not exercise_in_training or not exercise_in_training.training: return BaseError(status=400, detail="Exercise or training not found")
		if not await trainers_repo.check_trainer(user_id, exercise_in_training.training.owner_id): return BaseError(status=403, detail="Forbidden")

		query = delete(ExerciseInTraining).where(ExerciseInTraining.id == exercise_id)
		await self._session.execute(query)
		await self._session.commit()
		return "Successful"

	async def get_user_trainings(self, user_id: uuid.UUID, date: datetime.date) -> list[TrainingRead]:
		query = (
			select(Training)
			.where(Training.owner_id == user_id)
			.filter(
				Training.created_at >= datetime.datetime.combine(date, datetime.datetime.min.time()),
				Training.created_at < datetime.datetime.combine(date, datetime.datetime.max.time())
			)
			.options(
				selectinload(Training.exercises)
				.joinedload(ExerciseInTraining.exercise)
			)
		)

		trainings = await self._session.scalars(query)
		trainings = trainings.unique().all()
		trainings = list(map(self._convert_training, trainings))
		return trainings

	async def get_user_training(self, user_id: uuid.UUID, training_id: uuid.UUID, trainers_repo: ICheckStudentsTrainersRepo) -> TrainingRead:
		query = (
			select(Training)
			.where(Training.id == training_id)
			.options(
				selectinload(Training.exercises)
				.joinedload(ExerciseInTraining.exercise)
			)
		)
		training = await self._session.execute(query)
		training = training.scalar_one()
		if not await trainers_repo.check_trainer(user_id, training.owner_id): return BaseError(status=403, detail="Forbidden")
		return self._convert_training(training)