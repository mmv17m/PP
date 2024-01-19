from fastapi import Depends, FastAPI

from app.factories_and_stubs import sqlalchemy_repo_factory_maker
from .interfaces import IStudentsRepo
from .repos import StudentsRepo




def create_dependencies(app: FastAPI) -> None:
    app.dependency_overrides[IStudentsRepo] = sqlalchemy_repo_factory_maker(StudentsRepo)
