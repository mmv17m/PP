import uuid
import datetime
from abc import ABC, abstractmethod, abstractproperty

from app.auth.models import User
from .schemas import MealRead, DishRead, NormsSet, DishCreate, MealCreate, DishAdd




class IDietRepo(ABC):
	@abstractmethod
	async def get_user(self, user_id: uuid.UUID) -> User: pass

	@abstractmethod
	async def get_dishes(self, user_id: uuid.UUID, dish: str, amount: int = 10) -> list[DishRead]: pass

	@abstractmethod
	async def create_dish(self, user_id: uuid.UUID, dish: DishCreate) -> str: pass

	@abstractmethod
	async def create_meal(self, user_id: uuid.UUID, meal: MealCreate) -> str: pass

	@abstractmethod
	async def update_norms(self, user_id: uuid.UUID, norms: NormsSet) -> str: pass

	@abstractmethod
	async def add_dish(self, user_id: uuid.UUID, dish: DishAdd) -> str: pass

	@abstractmethod
	async def get_user_meals(self, user_id: uuid.UUID, date: datetime.date) -> list[MealRead]: pass
