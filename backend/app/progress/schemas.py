import uuid
import datetime

from pydantic import BaseModel, ConfigDict




class ValueRead(BaseModel):
	id: uuid.UUID
	value: int
	date: datetime.date


class MetricRead(BaseModel):
	id: uuid.UUID
	name: str
	units: str
	values: list[ValueRead]


class ValueAdd(BaseModel):
	metric_id: uuid.UUID
	value: int


class MetricCreate(BaseModel):
	name: str
	units: str