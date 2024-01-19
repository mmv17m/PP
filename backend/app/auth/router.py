from fastapi import APIRouter
from fastapi import Depends

from .models import User
from .auth import auth_backend
from .schemas import UserCreate, RegisterUserRead, UserRead
from .auth import fastapi_users, current_active_user




router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)


router.include_router(
    fastapi_users.get_auth_router(auth_backend),
    prefix="/jwt",
)

router.include_router(
    fastapi_users.get_register_router(RegisterUserRead, UserCreate),
)


#api
@router.get("/get_user")
async def get_user(user: User = Depends(current_active_user)) -> UserRead:
    return UserRead(
        id = user.id,
        email = user.email,
        role = user.role,
        gender = user.gender,
        nickname = user.nickname,
        birthdate = user.birthdate,
        joined = user.created_at.date()
    )