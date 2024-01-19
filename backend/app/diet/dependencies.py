from fastapi import Depends, FastAPI

from app.factories_and_stubs import sqlalchemy_repo_factory_maker
from .interfaces import IDietRepo
from .repos import DietRepo




def create_dependencies(app: FastAPI) -> None:
    app.dependency_overrides[IDietRepo] = sqlalchemy_repo_factory_maker(DietRepo)
