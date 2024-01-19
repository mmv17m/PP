from fastapi import Depends, FastAPI

from app.factories_and_stubs import sqlalchemy_repo_factory_maker
from .interfaces import IChatsRepo, IWebSocketChatsManager
from .repos import ChatsRepo
from .websocket_managers import manager



def chats_websocket_manager_factory():
	print(manager) 
	return manager


def create_dependencies(app: FastAPI) -> None:
	app.dependency_overrides[IChatsRepo] = sqlalchemy_repo_factory_maker(ChatsRepo)
	app.dependency_overrides[IWebSocketChatsManager] = chats_websocket_manager_factory