import uuid
from abc import ABC, abstractmethod, abstractproperty

from .schemas import StudentRead




class IStudentsRepo(ABC):
	@abstractmethod
	async def get_user_students(self, user_id: uuid.UUID) -> list[StudentRead]: pass