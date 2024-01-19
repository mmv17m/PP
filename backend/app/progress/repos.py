import uuid
import datetime
from typing import List

from sqlalchemy import text, or_, and_, desc, delete
from sqlalchemy.future import select
from sqlalchemy.orm import joinedload, selectinload, load_only
from pydantic import parse_obj_as

from app.database import BaseSqlAlchemyRepo
from app.auth.models import User
from .interfaces import IProgressRepo
from .schemas import MetricCreate, ValueAdd, MetricRead, ValueRead
from .models import Metric, Value




class ProgressRepo(BaseSqlAlchemyRepo, IProgressRepo): 

	def _convert_metric(self, metric):
		values = list(map(lambda x: ValueRead(id=x.id, value=x.value, date=x.created_at.date()), metric.values))
		values.sort(key=lambda x: x.date)
		converted_metric = MetricRead(id=metric.id, name=metric.name, units=metric.units, values=values)
		return converted_metric

	async def create_metric(self, user_id: uuid.UUID, metric: MetricCreate) -> str:
		new_metric = Metric(name=metric.name, units=metric.units, owner_id=user_id)
		self._session.add(new_metric)
		await self._session.flush()
		await self._session.commit()
		return "successful"

	async def add_value(self, value: ValueAdd) -> str:
		new_value = Value(value=value.value, metric_id=value.metric_id)
		self._session.add(new_value)
		await self._session.flush()
		await self._session.commit()
		return "successful"

	async def get_user_progress(self, user_id: uuid.UUID) -> list[MetricRead]:
		query = (
			select(User)
			.options(selectinload(User.metrics).joinedload(Metric.values))
			.where(User.id==user_id)
		)
		user = await self._session.scalars(query)
		user = user.unique().first()
		metrics = list(map(self._convert_metric, user.metrics))
		return metrics
		
