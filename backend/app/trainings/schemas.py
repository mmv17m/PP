import uuid
import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, Field




class ExerciseInTrainingRead(BaseModel):
	id: uuid.UUID
	exercise_id: uuid.UUID
	name: str
	description: str
	weight: int
	sets: int
	repetitions: int
	rest_time: int
	created_at: datetime.datetime


class TrainingRead(BaseModel):
	id: uuid.UUID
	name: str
	datetime: datetime.datetime
	exercises: list[ExerciseInTrainingRead]
	is_finished: bool = False
	finishing_time: datetime.datetime | None = None
	span: int | None = None


class ExerciseRead(BaseModel):
	id: uuid.UUID
	name: str
	description: str


class ExerciseCreate(BaseModel):
	name: str
	description: str


class ExerciseAdd(BaseModel):
	training_id: uuid.UUID
	exercise_id: uuid.UUID
	weight: int
	sets: int
	repetitions: int
	rest_time: int


class TrainingCreate(BaseModel):
	name: str
	date: datetime.date


class TrainingFinish(BaseModel):
	id: uuid.UUID
	finishing_time: datetime.datetime
	span: int