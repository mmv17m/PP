import uuid
from abc import ABC, abstractmethod, abstractproperty

from .schemas import MetricCreate, ValueAdd, MetricRead




class IProgressRepo(ABC):
	@abstractmethod
	async def create_metric(self, user_id: uuid.UUID, metric: MetricCreate) -> str: pass

	@abstractmethod
	async def add_value(self, value: ValueAdd) -> str: pass

	@abstractmethod
	async def get_user_progress(self, user_id: uuid.UUID) -> list[MetricRead]: pass