import uuid
import datetime
from typing import List

from sqlalchemy import Column, Integer, String, Table, ForeignKey
from sqlalchemy.orm import Mapped, relationship, mapped_column
from sqlalchemy.dialects.postgresql import UUID

from app.database import Base




class DishInMeal(Base):
	__tablename__ = "dish_in_meal"
	id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
	dish_id: Mapped[uuid.UUID] = mapped_column(ForeignKey('dish.id', ondelete="CASCADE"), nullable=False)
	meal_id: Mapped[uuid.UUID] = mapped_column(ForeignKey('meal.id', ondelete="CASCADE"), nullable=False)
	weight: Mapped[int] = mapped_column(nullable=False)

	dish: Mapped["Dish"] = relationship(back_populates="meals", foreign_keys=dish_id)
	meal: Mapped["Meal"] = relationship(back_populates="dishes", foreign_keys=meal_id)



class Dish(Base):
	__tablename__ = "dish"
	id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
	name: Mapped[str] = mapped_column(nullable=False)
	calories: Mapped[int] = mapped_column(nullable=False)
	proteins: Mapped[int] = mapped_column(nullable=False)
	fats: Mapped[int] = mapped_column(nullable=False)
	carbohydrates: Mapped[int] = mapped_column(nullable=False)
	water: Mapped[int] = mapped_column(nullable=False)
	owner_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("user.id"))

	owner: Mapped["User"] = relationship(back_populates="dishes")
	meals: Mapped[list["DishInMeal"]] = relationship(back_populates="dish")


class Meal(Base):
	__tablename__ = "meal"
	id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
	name: Mapped[str] = mapped_column(nullable=False)
	created_at: Mapped[datetime.datetime] = mapped_column(default=datetime.datetime.utcnow)
	owner_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("user.id"))

	owner: Mapped["User"] = relationship(back_populates="meals")
	dishes: Mapped[list["DishInMeal"]] = relationship(back_populates="meal")
