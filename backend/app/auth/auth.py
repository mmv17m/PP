import uuid

from fastapi_users.authentication import CookieTransport, JWTStrategy, AuthenticationBackend
from fastapi_users import FastAPIUsers
from fastapi import Depends, WebSocket, WebSocketException

from app.config import AUTH
from .models import User
from .manager import UserManager
from .dependencies import get_user_manager


cookie_transport = CookieTransport(cookie_name="user", cookie_max_age=360000)


def get_jwt_strategy() -> JWTStrategy:
	return JWTStrategy(secret=AUTH.jwt_secret_key, lifetime_seconds=86400000)


auth_backend = AuthenticationBackend(
    name="jwt",
    transport=cookie_transport,
    get_strategy=get_jwt_strategy,
)


fastapi_users = FastAPIUsers[User, uuid.UUID](
    get_user_manager,
    [auth_backend],
)

current_active_user = fastapi_users.current_user(active=True)


async def get_user_from_cookie(websocket: WebSocket, user_manager: UserManager = Depends(get_user_manager)):
    cookie = websocket.cookies.get("user")
    user = await auth_backend.get_strategy().read_token(cookie, user_manager)
    if not user or not user.is_active:
        raise WebSocketException("Invalid user")
    return user