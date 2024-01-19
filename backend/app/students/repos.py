import uuid
import datetime
from typing import List

from sqlalchemy.future import select
from sqlalchemy.orm import joinedload, load_only

from app.database import BaseSqlAlchemyRepo
from app.auth.models import User
from .interfaces import IStudentsRepo
from .schemas import StudentRead




class StudentsRepo(BaseSqlAlchemyRepo, IStudentsRepo):
	async def get_user_students(self, user_id: uuid.UUID) -> list[StudentRead]:
		query = (
			select(User)
			.where(User.id == user_id)
			.options(joinedload(User.students).load_only(User.id, User.nickname))
			.filter(User.role == "trainer")
			
		)
		user = await self._session.execute(query)
		user = user.scalars().unique().first()
		students = list(map(lambda i: StudentRead(id=i.id, nickname=i.nickname), user.students))
		return students
