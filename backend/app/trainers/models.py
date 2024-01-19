import uuid
import datetime
from typing import List

from sqlalchemy import Column, Integer, String, Table, ForeignKey
from sqlalchemy.orm import Mapped, relationship, mapped_column
from sqlalchemy.dialects.postgresql import UUID

from app.database import Base




class Trainer(Base):
	__tablename__ = "trainer"
	trainer_id: Mapped[uuid.UUID] = mapped_column(ForeignKey('user.id', ondelete="CASCADE"), primary_key=True)
	student_id: Mapped[uuid.UUID] = mapped_column(ForeignKey('user.id', ondelete="CASCADE"), primary_key=True)