from fastapi import Depends
from fastapi_users.db import SQLAlchemyUserDatabase
from sqlalchemy.ext.asyncio import AsyncSession

from app.factories_and_stubs import get_session_stub
from .models import User


async def get_user_db(session: AsyncSession = Depends(get_session_stub)):
    yield SQLAlchemyUserDatabase(session, User)