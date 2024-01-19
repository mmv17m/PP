import uuid
import datetime

from pydantic import BaseModel, ConfigDict




class NormsRead(BaseModel):
	calories: int
	proteins: int
	fats: int
	carbohydrates: int
	water: int


class DishInMealRead(BaseModel):
	id: uuid.UUID
	dish_id: uuid.UUID
	name: str
	weight: int
	calories: int
	proteins: int
	fats: int
	carbohydrates: int
	water: int	


class DishRead(BaseModel):
	id: uuid.UUID
	name: str
	calories: int
	proteins: int
	fats: int
	carbohydrates: int
	water: int	


class MealRead(BaseModel):
	id: uuid.UUID
	name: str
	datetime: datetime.time
	dishes: list[DishInMealRead]


class NormsSet(BaseModel):
	calories: int
	proteins: int
	fats: int
	carbohydrates: int
	water: int


class DishCreate(BaseModel):
	name: str
	calories: int
	proteins: int
	fats: int
	carbohydrates: int
	water: int


class MealCreate(BaseModel):
	name: str
	created_at: datetime.datetime


class DishAdd(BaseModel):
	dish_id: uuid.UUID
	meal_id: uuid.UUID
	weight: int