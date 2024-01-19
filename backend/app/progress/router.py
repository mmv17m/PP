import uuid

from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from fastapi import Depends, HTTPException

from app.auth.models import User
from app.auth.auth import current_active_user, get_user_from_cookie
from app.trainers.interfaces import ICheckStudentsTrainersRepo
from .interfaces import IProgressRepo
from .schemas import MetricRead, ValueAdd, MetricCreate




router = APIRouter(	
	prefix="/progress",
	tags=["progress"]
)


@router.get("/get_user_progress")
async def get_user_progress(
	user_id: uuid.UUID | None = None, 
	user: User = Depends(current_active_user), 
	progress_repo: IProgressRepo = Depends(), 
	trainers_repo: ICheckStudentsTrainersRepo = Depends()
) -> list[MetricRead]:
	if user_id and not await trainers_repo.check_trainer(user.id, user_id):  
		raise HTTPException(status_code=403, detail="Forbidden")
	if not user_id: user_id = user.id
	progress = await progress_repo.get_user_progress(user_id)
	return progress


@router.post("/add_value")
async def add_value(value: ValueAdd, user: User = Depends(current_active_user), progress_repo: IProgressRepo = Depends()) -> str:
	result = await progress_repo.add_value(value)
	return result


@router.post("/add_metric")
async def add_metric(metric: MetricCreate,  user: User = Depends(current_active_user), progress_repo: IProgressRepo = Depends()) -> str:
	result = await progress_repo.create_metric(user.id, metric)
	return result