import uuid

from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from fastapi import Depends

from app.auth.models import User
from app.auth.auth import current_active_user, get_user_from_cookie
from .schemas import PossibleTrainerRead, TrainerRead
from .interfaces import ITrainersRepo




router = APIRouter(	
	prefix="/trainers",
	tags=["trainers"]
)


@router.get("/get_possible_trainers")
async def get_possible_trainers(nickname: str, amount: int = 10, user: User = Depends(current_active_user), trainers_repo: ITrainersRepo = Depends()) -> list[PossibleTrainerRead]:
	trainers = await trainers_repo.search_trainers(user.id, nickname, amount)
	return trainers


@router.get("/get_my_trainers")
async def get_possible_trainers(user: User = Depends(current_active_user), trainers_repo: ITrainersRepo = Depends()) -> list[TrainerRead]:
	trainers = await trainers_repo.get_user_trainers(user.id)
	return trainers 


@router.post("/create_trainer")
async def create_trainer(trainer_id: uuid.UUID, user: User = Depends(current_active_user), trainers_repo: ITrainersRepo = Depends()) -> str:
	result = await trainers_repo.create_trainer(user.id, trainer_id)
	return result


@router.post("/delete_trainer")
async def delete_trainer(trainer_id: uuid.UUID, user: User = Depends(current_active_user), trainers_repo: ITrainersRepo = Depends()) -> str:
	result = await trainers_repo.delete_trainer(user.id, trainer_id)
	return result