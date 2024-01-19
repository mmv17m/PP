from fastapi import Depends, FastAPI

from app.factories_and_stubs import sqlalchemy_repo_factory_maker
from .interfaces import ITrainersRepo, ICheckStudentsTrainersRepo
from .repos import TrainersRepo, CheckStudentsTrainersRepo




def create_dependencies(app: FastAPI) -> None:
    app.dependency_overrides[ITrainersRepo] = sqlalchemy_repo_factory_maker(TrainersRepo)
    app.dependency_overrides[ICheckStudentsTrainersRepo] = sqlalchemy_repo_factory_maker(CheckStudentsTrainersRepo)
