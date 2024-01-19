from fastapi import Depends, FastAPI
from fastapi_users.db import SQLAlchemyUserDatabase

from .manager import UserManager
from .utils import get_user_db




async def get_user_manager(user_db=Depends(get_user_db)):
    yield UserManager(user_db)


def create_dependencies(app: FastAPI) -> None:
    app.dependency_overrides[UserManager] = get_user_manager