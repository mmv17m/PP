from fastapi import APIRouter
from fastapi import FastAPI

from .auth.router import router as auth_router
from .chats.router import router as chats_router
from .trainers.router import router as trainers_router
from .students.router import router as students_router
from .progress.router import router as progress_router
from .trainings.router import router as trainings_router
from .diet.router import router as diet_router



main_router = APIRouter(
	prefix="/api",
	tags=["api"]
)

def connect_routers(app: FastAPI) -> None:
	main_router.include_router(auth_router)
	main_router.include_router(chats_router)
	main_router.include_router(trainers_router)
	main_router.include_router(students_router)
	main_router.include_router(progress_router)
	main_router.include_router(diet_router)
	main_router.include_router(trainings_router)
	app.include_router(main_router)