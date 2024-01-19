import uuid
from typing import Optional
import datetime

from pydantic import BaseModel
from fastapi_users import schemas

from .enums import Role, Gender




class UserRead(BaseModel):
    id: uuid.UUID
    nickname: str
    email: str
    role: Role
    gender: Gender
    is_active: Optional[bool] = True
    is_superuser: Optional[bool] = False
    is_verified: Optional[bool] = False
    birthdate: datetime.date
    joined: datetime.date


class RegisterUserRead(schemas.BaseUser[uuid.UUID]):
    nickname: str
    email: str
    role: Role
    gender: Gender
    is_active: Optional[bool] = True
    is_superuser: Optional[bool] = False
    is_verified: Optional[bool] = False
    birthdate: datetime.date


class UserCreate(schemas.BaseUserCreate):
    nickname: str
    email: str
    password: str
    role: Role
    gender: Gender
    is_active: Optional[bool] = True
    is_superuser: Optional[bool] = False
    is_verified: Optional[bool] = False
    birthdate: datetime.date


class UserUpdate(schemas.BaseUserUpdate):
    nickname: str
    email: str
    password: str
    role: Role
    gender: Gender
    is_active: Optional[bool] = True
    is_superuser: Optional[bool] = False
    is_verified: Optional[bool] = False
    birthdate: datetime.date