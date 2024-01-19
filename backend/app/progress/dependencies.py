from fastapi import Depends, FastAPI

from app.factories_and_stubs import sqlalchemy_repo_factory_maker
from .interfaces import IProgressRepo
from .repos import ProgressRepo




def create_dependencies(app: FastAPI) -> None:
    app.dependency_overrides[IProgressRepo] = sqlalchemy_repo_factory_maker(ProgressRepo)
