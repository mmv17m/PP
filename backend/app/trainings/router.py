import uuid
import datetime

from fastapi import APIRouter
from fastapi import Depends, HTTPException

from app.auth.models import User
from app.auth.auth import current_active_user, get_user_from_cookie
from app.trainers.interfaces import ICheckStudentsTrainersRepo

from .interfaces import ITrainingsRepo
from app.schemas import BaseError
from .schemas import TrainingRead, ExerciseRead, ExerciseCreate, ExerciseAdd, TrainingCreate, TrainingFinish




router = APIRouter(	
	prefix="/trainings",
	tags=["trainings"]
)


@router.get("/get_user_trainings")
async def get_user_trainings(
	date: datetime.date,
	user_id: uuid.UUID | None = None, 
	user: User = Depends(current_active_user), 
	trainings_repo: ITrainingsRepo = Depends(), 
	trainers_repo: ICheckStudentsTrainersRepo = Depends()
) -> list[TrainingRead]:
	if user_id and not await trainers_repo.check_trainer(user.id, user_id):  
		raise HTTPException(status_code=403, detail="Forbidden")
	if not user_id: user_id = user.id
	trainings = await trainings_repo.get_user_trainings(user_id, date)
	return trainings


@router.get("/get_user_training")
async def get_user_training(
	training_id: uuid.UUID,
	user: User = Depends(current_active_user), 
	trainings_repo: ITrainingsRepo = Depends(), 
	trainers_repo: ICheckStudentsTrainersRepo = Depends()
) -> TrainingRead:
	training = await trainings_repo.get_user_training(user.id, training_id, trainers_repo)
	if type(training) == BaseError: raise HTTPException(status_code=training.status, detail=training.detail) 
	return training


@router.get("/get_exercises")
async def get_exercises(name: str, amount: int = 10, user: User = Depends(current_active_user), trainings_repo: ITrainingsRepo = Depends()) -> list[ExerciseRead]:
	exercises = await trainings_repo.get_exercises(user.id, name, amount)
	return exercises


@router.post("/add_exercise")
async def add_exercise(
	exercise: ExerciseAdd,
	user: User = Depends(current_active_user), 
	trainings_repo: ITrainingsRepo = Depends(),
	trainers_repo: ICheckStudentsTrainersRepo = Depends()
) -> str:
	result = await trainings_repo.add_exercise(user.id, exercise, trainers_repo)
	if type(result) == BaseError: raise HTTPException(status_code=training.status, detail=training.detail) 
	return result


@router.post("/create_exercise")
async def create_exercise(exercise: ExerciseCreate, user: User = Depends(current_active_user), trainings_repo: ITrainingsRepo = Depends()) -> str:
	result = await trainings_repo.create_exercise(user.id, exercise)
	return result


@router.post("/remove_exercise")
async def remove_exercise(
	exercise_in_training_id: uuid.UUID, 
	user: User = Depends(current_active_user), 
	trainings_repo: ITrainingsRepo = Depends(),
	trainers_repo: ICheckStudentsTrainersRepo = Depends()
) -> str:
	result = await trainings_repo.remove_exercise(user.id, exercise_in_training_id, trainers_repo)
	if type(result) == BaseError: raise HTTPException(status_code=training.status, detail=training.detail) 
	return result


@router.post("/create_user_training")
async def create_user_training(
	training: TrainingCreate,
	user_id: uuid.UUID | None = None, 
	user: User = Depends(current_active_user), 
	trainings_repo: ITrainingsRepo = Depends(), 
	trainers_repo: ICheckStudentsTrainersRepo = Depends()
) -> str:
	if user_id and not await trainers_repo.check_trainer(user.id, user_id):  
		raise HTTPException(status_code=403, detail="Forbidden")
	if not user_id: user_id = user.id
	result = await trainings_repo.create_user_training(user_id, training)
	return result


@router.post("/finish_training")
async def finish_training(training: TrainingFinish, user: User = Depends(current_active_user), trainings_repo: ITrainingsRepo = Depends()) -> str:
	result = await trainings_repo.finish_training(user.id, training)
	return result


@router.post("/delete_user_training")
async def delete_user_training(
	training_id: uuid.UUID,
	user_id: uuid.UUID | None = None, 
	user: User = Depends(current_active_user), 
	trainings_repo: ITrainingsRepo = Depends(), 
	trainers_repo: ICheckStudentsTrainersRepo = Depends()
) -> str:
	if user_id and not await trainers_repo.check_trainer(user.id, user_id):  
		raise HTTPException(status_code=403, detail="Forbidden")
	if not user_id: user_id = user.id
	result = await trainings_repo.delete_user_training(user_id, training_id)
	return result