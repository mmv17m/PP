import uuid
import datetime
from typing import List

from sqlalchemy import Column, Integer, String, Table, ForeignKey
from sqlalchemy.orm import Mapped, relationship, mapped_column
from sqlalchemy.dialects.postgresql import UUID

from app.database import Base




class Metric(Base):
	__tablename__ = "metric"
	id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
	name: Mapped[str] = mapped_column(nullable=False, unique=True)
	units: Mapped[str] = mapped_column(nullable=False)
	created_at: Mapped[datetime.datetime] = mapped_column(default=datetime.datetime.utcnow)
	owner_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("user.id"))
	
	owner: Mapped["User"] = relationship(back_populates="metrics")
	values: Mapped[List["Value"]] = relationship(back_populates="metric")


class Value(Base):
	__tablename__ = "value"
	id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
	value: Mapped[int] = mapped_column(nullable=False)
	created_at: Mapped[datetime.datetime] = mapped_column(default=datetime.datetime.utcnow)
	metric_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("metric.id"))

	metric: Mapped["Metric"] = relationship(back_populates="values")