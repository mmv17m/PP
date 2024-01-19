from fastapi import Depends, FastAPI

from app.factories_and_stubs import sqlalchemy_repo_factory_maker
from .interfaces import ITrainingsRepo
from .repos import TrainingsRepo




def create_dependencies(app: FastAPI) -> None:
    app.dependency_overrides[ITrainingsRepo] = sqlalchemy_repo_factory_maker(TrainingsRepo)
