import uuid
import datetime
from abc import ABC, abstractmethod, abstractproperty

from app.auth.models import User
from app.trainers.interfaces import ICheckStudentsTrainersRepo
from .schemas import TrainingRead, ExerciseRead, ExerciseCreate, ExerciseAdd, TrainingCreate, ExerciseInTrainingRead, TrainingFinish




class ITrainingsRepo(ABC):
	@abstractmethod
	async def create_exercise(self, user_id: uuid.UUID, exercise: ExerciseCreate) -> str: pass

	@abstractmethod
	async def get_exercises(self, user_id: uuid.UUID, name: str, amount: int = 10) -> list[ExerciseRead]: pass

	@abstractmethod
	async def create_user_training(self, user_id: uuid.UUID, training: TrainingCreate) -> str: pass

	@abstractmethod
	async def delete_user_training(self, user_id: uuid.UUID, training_id: uuid.UUID) -> str: pass

	@abstractmethod
	async def finish_training(self, user_id: uuid.UUID, training: TrainingFinish) -> str: pass

	@abstractmethod
	async def add_exercise(self, user_id: uuid.UUID, exercise: ExerciseAdd, trainers_repo: ICheckStudentsTrainersRepo) -> str: pass

	@abstractmethod
	async def remove_exercise(self, user_id: uuid.UUID, exercise_id: uuid.UUID, trainers_repo: ICheckStudentsTrainersRepo) -> str: pass

	@abstractmethod
	async def get_user_trainings(self, user_id: uuid.UUID, date: datetime.date) -> list[TrainingRead]: pass

	@abstractmethod
	async def get_user_training(self, user_id: uuid.UUID, training_id: uuid.UUID, trainers_repo: ICheckStudentsTrainersRepo) -> TrainingRead: pass