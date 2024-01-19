from fastapi import Depends, FastAPI
from sqlalchemy.ext.asyncio import AsyncSession

import app.auth.dependencies as auth_dependencies
import app.chats.dependencies as chats_dependencies
import app.trainers.dependencies as trainers_dependencies
import app.students.dependencies as students_dependencies
import app.progress.dependencies as progress_dependencies
import app.diet.dependencies as diet_dependencies
import app.trainings.dependencies as trainings_dependencies
from .database import get_session
from .factories_and_stubs import get_session_stub




def create_dependencies(app: FastAPI) -> None:
    app.dependency_overrides[get_session_stub] = get_session
    chats_dependencies.create_dependencies(app)
    auth_dependencies.create_dependencies(app)
    trainers_dependencies.create_dependencies(app)
    students_dependencies.create_dependencies(app)
    progress_dependencies.create_dependencies(app)
    diet_dependencies.create_dependencies(app)
    trainings_dependencies.create_dependencies(app)
