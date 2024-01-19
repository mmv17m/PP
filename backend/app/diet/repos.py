import uuid
import datetime
from typing import List

from sqlalchemy import text, or_, and_, desc, delete
from sqlalchemy.future import select
from sqlalchemy.orm import joinedload, selectinload, load_only
from pydantic import parse_obj_as

from app.database import BaseSqlAlchemyRepo
from app.auth.models import User
from .interfaces import IDietRepo
from .models import Dish, Meal, DishInMeal
from .schemas import MealRead, DishRead, NormsSet, DishCreate, MealCreate, DishAdd, DishInMealRead




class DietRepo(BaseSqlAlchemyRepo, IDietRepo): 
	def _convert_meal(self, meal: Meal) -> MealRead:
		dishes = map(lambda i: DishInMealRead(
			id=i.id,
			dish_id = i.dish.id, 
			name=i.dish.name,
			weight=i.weight,
			calories=i.dish.calories,
			proteins=i.dish.proteins,
			fats=i.dish.fats,
			carbohydrates=i.dish.carbohydrates,
			water=i.dish.water
		), meal.dishes)
		return MealRead(id=meal.id, name=meal.name, datetime=meal.created_at.time(), dishes=dishes)

	async def get_user(self, user_id: uuid.UUID) -> User:
		query = select(User).where(User.id==user_id)
		user = await self._session.scalars(query)
		user = user.unique().first()
		return user

	async def get_dishes(self, user_id: uuid.UUID, dish: str, amount: int = 10) -> list[DishRead]:
		query = (
			select(Dish)
			.where(Dish.owner_id==user_id)
			.filter(Dish.name.ilike("%"+dish+"%"))
			.limit(amount)
		)
		dishes = await self._session.scalars(query)
		dishes = dishes.unique().all()
		dishes = list(map(lambda i: DishRead(id=i.id, name=i.name, calories=i.calories, proteins=i.proteins, fats=i.fats, carbohydrates=i.carbohydrates, water=i.water), dishes))
		return dishes

	async def create_dish(self, user_id: uuid.UUID, dish: DishCreate) -> str:
		new_dish = Dish(name=dish.name, calories=dish.calories, proteins=dish.proteins, fats=dish.fats, carbohydrates=dish.carbohydrates, water=dish.water, owner_id=user_id)
		self._session.add(new_dish)
		await self._session.flush()
		await self._session.commit()
		return "successful"

	async def create_meal(self, user_id: uuid.UUID, meal: MealCreate) -> str:
		new_meal = Meal(owner_id=user_id, name=meal.name, created_at=meal.created_at)
		self._session.add(new_meal)
		await self._session.flush()
		await self._session.commit()
		return "successful"

	async def update_norms(self, user_id: uuid.UUID, norms: NormsSet) -> str:
		user = await self._session.execute(select(User).where(User.id==user_id))
		user = user.scalar_one()
		user.calories = norms.calories
		user.proteins = norms.proteins
		user.fats = norms.fats
		user.carbohydrates = norms.carbohydrates
		user.water = norms.water
		await self._session.flush()
		await self._session.commit()
		return "successful"

	async def add_dish(self, user_id: uuid.UUID, dish: DishAdd) -> str:
		meal = await self._session.execute(select(Meal).where(Meal.id==dish.meal_id))
		meal = meal.scalar_one()
		if meal.owner_id != user_id: return "fail"
		new_dish = DishInMeal(dish_id=dish.dish_id, meal_id=dish.meal_id, weight=dish.weight)
		self._session.add(new_dish)
		await self._session.flush()
		await self._session.commit()	
		return "successful"	

	async def get_user_meals(self, user_id: uuid.UUID, date: datetime.date) -> list[MealRead]:
		query = (
			select(Meal)
			.where(Meal.owner_id == user_id)
			.filter(
				Meal.created_at >= datetime.datetime.combine(date, datetime.datetime.min.time()),
				Meal.created_at < datetime.datetime.combine(date, datetime.datetime.max.time())
			)
			.options(
				selectinload(Meal.dishes)
				.joinedload(DishInMeal.dish)
			)
		)

		meals = await self._session.scalars(query)
		meals = meals.unique().all()
		meals = list(map(self._convert_meal, meals))
		return meals
