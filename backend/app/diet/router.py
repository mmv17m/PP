import uuid
import datetime

from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from fastapi import Depends, HTTPException

from app.auth.models import User
from app.auth.auth import current_active_user, get_user_from_cookie
from app.trainers.interfaces import ICheckStudentsTrainersRepo

from .interfaces import IDietRepo
from .schemas import NormsRead, MealRead, DishRead, NormsSet, DishCreate, MealCreate, DishAdd




router = APIRouter(	
	prefix="/diet",
	tags=["diet"]
)


@router.get("/get_user_norms")
async def get_user_norms(
	user_id: uuid.UUID | None = None, 
	user: User = Depends(current_active_user), 
	diet_repo: IDietRepo = Depends(), 
	trainers_repo: ICheckStudentsTrainersRepo = Depends()
) -> NormsRead:
	
	if user_id and not await trainers_repo.check_trainer(user.id, user_id):  
		raise HTTPException(status_code=403, detail="Forbidden")
	current_user = user
	if user_id: current_user = await diet_repo.get_user(user_id)
	
	return NormsRead(
		calories = current_user.calories,
		proteins = current_user.proteins,
		fats = current_user.fats,
		carbohydrates = current_user.carbohydrates,
		water = current_user.water
	)


@router.get("/get_user_meals")
async def get_user_meals(
	date: datetime.date,
	user_id: uuid.UUID | None = None, 
	user: User = Depends(current_active_user), 
	diet_repo: IDietRepo = Depends(), 
	trainers_repo: ICheckStudentsTrainersRepo = Depends()
) -> list[MealRead]:
	if user_id and not await trainers_repo.check_trainer(user.id, user_id):  
		raise HTTPException(status_code=403, detail="Forbidden")
	if not user_id: user_id = user.id
	result = await diet_repo.get_user_meals(user_id, date)
	return result


@router.get("/get_dishes")
async def get_dishes(dish: str, amount: int = 10, user: User = Depends(current_active_user), diet_repo: IDietRepo = Depends()) -> list[DishRead]:
	dishes = await diet_repo.get_dishes(user.id, dish, amount)
	return dishes


@router.post("/set_user_norms")
async def set_user_norms(
	norms: NormsSet,
	user_id: uuid.UUID | None = None, 
	user: User = Depends(current_active_user), 
	diet_repo: IDietRepo = Depends(), 
	trainers_repo: ICheckStudentsTrainersRepo = Depends()
) -> str:
	if user_id and not await trainers_repo.check_trainer(user.id, user_id):  
		raise HTTPException(status_code=403, detail="Forbidden")
	if not user_id: user_id = user.id
	result = await diet_repo.update_norms(user_id, norms)
	return result
	


@router.post("/create_dish")
async def create_dish(dish: DishCreate, user: User = Depends(current_active_user), diet_repo: IDietRepo = Depends()) -> str:
	result = await diet_repo.create_dish(user.id, dish)
	return result


@router.post("/create_meal")
async def create_meal(meal: MealCreate, user: User = Depends(current_active_user), diet_repo: IDietRepo = Depends()) -> str:
	result = await diet_repo.create_meal(user.id, meal)
	return result


@router.post("/add_dish")
async def add_dish(dish: DishAdd, user: User = Depends(current_active_user), diet_repo: IDietRepo = Depends()) -> str:
	result = await diet_repo.add_dish(user.id, dish)
	return result