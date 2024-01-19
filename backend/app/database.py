from typing import AsyncGenerator

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.ext.asyncio import async_sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import text

from app.config import DATABASE




engine = create_async_engine(DATABASE.url, future=True, echo=True, pool_size=3, max_overflow=15)
Base = declarative_base()
session_maker = async_sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)


async def get_session() -> AsyncGenerator[AsyncSession, None]:
	async with session_maker() as session:
		yield session


class BaseSqlAlchemyRepo:
	_session: AsyncSession

	def __init__(self, session: AsyncSession) -> None:
		self._session = session 