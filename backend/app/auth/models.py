import uuid
import datetime
from typing import List

from sqlalchemy import Column, Boolean, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from fastapi_users.db import SQLAlchemyBaseUserTableUUID, SQLAlchemyUserDatabase

from app.database import Base
from app.chats.models import Chat, Message
from app.trainers.models import Trainer
from app.progress.models import Metric
from app.diet.models import Meal
from app.trainings.models import Training, Exercise
from .enums import Role, Gender


#можно использовать annotated


class User(SQLAlchemyBaseUserTableUUID, Base):
	__tablename__ = "user"

	id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
	nickname: Mapped[str] = mapped_column(nullable=False, unique=True)
	email: Mapped[str] = mapped_column(nullable=False, unique=True)
	role: Mapped[Role] = mapped_column(nullable=False)
	gender: Mapped[Gender] = mapped_column(nullable=False)
	created_at: Mapped[datetime.datetime] = mapped_column(default=datetime.datetime.utcnow)
	hashed_password: Mapped[str] = mapped_column(nullable=False)
	is_active: Mapped[bool] = mapped_column(nullable=False, default=True)
	is_superuser: Mapped[bool] = mapped_column(nullable=False, default=False)
	is_verified: Mapped[bool] = mapped_column(nullable=False, default=False)
	birthdate: Mapped[datetime.date] = mapped_column(nullable=False)

	calories: Mapped[int] = mapped_column(nullable=False, default=0)
	proteins: Mapped[int] = mapped_column(nullable=False, default=0)
	fats: Mapped[int] = mapped_column(nullable=False, default=0)
	carbohydrates: Mapped[int] = mapped_column(nullable=False, default=0)
	water: Mapped[int] = mapped_column(nullable=False, default=0)

	#в зависимости от того кто создает чат срабатывает chats_1 или chats_2 

	chats_users_1: Mapped[List["User"]] = relationship('User', secondary="chat", 
    	primaryjoin=id==Chat.first_user_id,
        secondaryjoin=id==Chat.second_user_id,
        back_populates='chats_users_2'
    )

	chats_users_2: Mapped[List["User"]] = relationship('User', secondary="chat", 
        primaryjoin=id==Chat.second_user_id,
        secondaryjoin=id==Chat.first_user_id,
        back_populates='chats_users_1'
    )

	chats_1: Mapped[List["Chat"]] = relationship(back_populates="first_user", foreign_keys=[Chat.first_user_id])
	chats_2: Mapped[List["Chat"]] = relationship(back_populates="first_user", foreign_keys=[Chat.second_user_id])

	messages: Mapped[List["Message"]] = relationship(back_populates="sender")

	students: Mapped[List["User"]] = relationship("User", secondary="trainer", primaryjoin=id==Trainer.trainer_id, secondaryjoin=id==Trainer.student_id, back_populates="students")
	trainers: Mapped[List["User"]] = relationship("User", secondary="trainer", primaryjoin=id==Trainer.student_id, secondaryjoin=id==Trainer.trainer_id, back_populates="trainers")

	metrics: Mapped[List["Metric"]] = relationship(back_populates="owner")
	meals: Mapped[List["Meal"]] = relationship(back_populates="owner")
	dishes: Mapped[List["Dish"]] = relationship(back_populates="owner")
	trainings: Mapped[List["Training"]] = relationship(back_populates="owner")
	exercises: Mapped[List["Exercise"]] = relationship(back_populates="owner")
