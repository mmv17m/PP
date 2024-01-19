import uuid
import datetime
from typing import List

from sqlalchemy import Column, Integer, String, Table, ForeignKey
from sqlalchemy.orm import Mapped, relationship, mapped_column
from sqlalchemy.dialects.postgresql import UUID

from app.database import Base




class ExerciseInTraining(Base):
	__tablename__ = "exercise_in_training"
	id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
	training_id: Mapped[uuid.UUID] = mapped_column(ForeignKey('training.id', ondelete="CASCADE"), nullable=False)
	exercise_id: Mapped[uuid.UUID] = mapped_column(ForeignKey('exercise.id', ondelete="CASCADE"), nullable=False)
	weight: Mapped[int] = mapped_column(nullable=False)
	sets: Mapped[int] = mapped_column(nullable=False)
	repetitions: Mapped[int] = mapped_column(nullable=False)
	rest_time: Mapped[int] = mapped_column(nullable=False)
	created_at: Mapped[datetime.datetime] = mapped_column(default=datetime.datetime.utcnow)

	training: Mapped["Training"] = relationship(back_populates="exercises", foreign_keys=training_id)
	exercise: Mapped["Exercise"] = relationship(back_populates="trainings", foreign_keys=exercise_id)


class Training(Base):
	__tablename__ = "training"

	id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
	name: Mapped[str] = mapped_column(nullable=False)
	created_at: Mapped[datetime.datetime] = mapped_column(default=datetime.datetime.utcnow) #date
	owner_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("user.id"))
	is_finished: Mapped[bool] = mapped_column(default=False, nullable=False)
	finishing_time: Mapped[datetime.datetime | None] = mapped_column(nullable=True)
	span: Mapped[int | None] = mapped_column(nullable=True)

	owner: Mapped["User"] = relationship(back_populates="trainings")
	exercises: Mapped[list["ExerciseInTraining"]] = relationship(back_populates="training")


class Exercise(Base):
	__tablename__ = "exercise"

	id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
	name: Mapped[str] = mapped_column(nullable=False)
	description: Mapped[str] = mapped_column(nullable=False)
	created_at: Mapped[datetime.datetime] = mapped_column(default=datetime.datetime.utcnow)
	owner_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("user.id"))

	owner: Mapped["User"] = relationship(back_populates="exercises")
	trainings: Mapped[list["ExerciseInTraining"]] = relationship(back_populates="exercise")

