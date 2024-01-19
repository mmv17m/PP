import uuid
from abc import ABC, abstractmethod, abstractproperty

from .schemas import PossibleTrainerRead, TrainerRead




class ITrainersRepo(ABC):
	@abstractmethod
	async def search_trainers(self, user_id: uuid.UUID, nickname: str, amount: int = 10) -> list[PossibleTrainerRead]: pass

	@abstractmethod
	async def create_trainer(self, user_id: uuid.UUID, trainer_id: uuid.UUID) -> str: pass

	@abstractmethod
	async def get_user_trainers(self, user_id: uuid.UUID) -> list[TrainerRead]: pass

	@abstractmethod
	async def delete_trainer(self, user_id: uuid.UUID, trainer_id: uuid.UUID) -> str: pass


class ICheckStudentsTrainersRepo(ABC):
	@abstractmethod
	async def check_trainer(self, trainer_id: uuid.UUID, student_id: uuid.UUID) -> bool: pass