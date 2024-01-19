import uuid

from fastapi import APIRouter
from fastapi import Depends

from app.auth.models import User
from app.auth.auth import current_active_user
from .schemas import StudentRead
from .interfaces import IStudentsRepo




router = APIRouter(	
	prefix="/students",
	tags=["students"]
)



@router.get("/get_my_students")
async def get_possible_trainers(user: User = Depends(current_active_user), students_repo: IStudentsRepo = Depends()) -> list[StudentRead]:
	students = await students_repo.get_user_students(user.id)
	return students 