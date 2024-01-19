import uuid
import datetime
from typing import List

from sqlalchemy import text, or_, and_, desc, delete
from sqlalchemy.future import select
from sqlalchemy.orm import joinedload, selectinload, load_only
from pydantic import parse_obj_as

from app.database import BaseSqlAlchemyRepo
from app.auth.models import User
from .interfaces import ITrainersRepo, ICheckStudentsTrainersRepo
from .schemas import PossibleTrainerRead, TrainerRead
from .models import Trainer




class TrainersRepo(BaseSqlAlchemyRepo, ITrainersRepo):
	async def search_trainers(self, user_id: uuid.UUID, nickname: str, amount: int = 10) -> list[PossibleTrainerRead]:
		"""Method to search trainers"""
		query = (
			select(User.id, User.nickname)
			.where(User.id != user_id)
			.filter(User.role == "trainer")
			.filter(User.nickname.ilike("%"+nickname+"%"))
			.limit(amount)
		)
		trainers = await self._session.execute(query)
		trainers = trainers.unique().all()
		trainers = list(map(lambda i: PossibleTrainerRead(id=i[0], nickname=i[1]), trainers))
		return trainers

	async def create_trainer(self, user_id: uuid.UUID, trainer_id: uuid.UUID) -> str:
		new_trainer = Trainer(trainer_id=trainer_id, student_id=user_id)
		self._session.add(new_trainer)
		await self._session.flush()
		await self._session.commit()
		return "successful"

	async def get_user_trainers(self, user_id: uuid.UUID) -> list[TrainerRead]:
		query = (
			select(User)
			.where(User.id == user_id)
			.options(joinedload(User.trainers).load_only(User.id, User.nickname))
			
		)
		user = await self._session.execute(query)
		user = user.scalars().unique().first()
		trainers = list(map(lambda i: TrainerRead(id=i.id, nickname=i.nickname), user.trainers))
		return trainers

	async def delete_trainer(self, user_id: uuid.UUID, trainer_id: uuid.UUID) -> str:
		query = (
			delete(Trainer)
			.where(Trainer.trainer_id == trainer_id)
			.where(Trainer.student_id == user_id)
		)
		await self._session.execute(query)
		await self._session.commit()
		return "successful"


class CheckStudentsTrainersRepo(BaseSqlAlchemyRepo, ICheckStudentsTrainersRepo):
	async def check_trainer(self, trainer_id: uuid.UUID, student_id: uuid.UUID) -> bool:
		if trainer_id == student_id: return True
		query = (
			select(Trainer)
			.where(Trainer.trainer_id == trainer_id)
			.where(Trainer.student_id == student_id)
		)
		trainers = await self._session.execute(query)
		trainers = trainers.scalars().unique().all()
		return len(trainers) >= 1