import uuid
import datetime
from abc import ABC, abstractmethod, abstractproperty

from fastapi import WebSocket

from .schemas import ChatRead, PossibleChatRead, MessageRead
from app.auth.models import User



class IChatsRepo(ABC):
	@abstractmethod
	async def get_chats(user_id: uuid.UUID) -> list[ChatRead]: pass

	@abstractmethod
	async def search_users(self, user_id: uuid.UUID, nickname: str, amount: int = 10) -> list[PossibleChatRead]: pass

	@abstractmethod
	async def create_chat(self, user_id: uuid.UUID, user2_id: uuid.UUID) -> str: pass

	@abstractmethod
	async def check_if_user_has_chat(self, chat_id: uuid.UUID, user_id: uuid.UUID) -> bool: pass

	@abstractmethod
	async def add_message(self, chat_id: uuid.UUID, user_id: uuid.UUID, text: str) -> MessageRead: pass

	@abstractmethod
	async def get_messages(self, chat_id: uuid.UUID, amount: int = 10, start_time: datetime.datetime = datetime.datetime.utcnow()) -> list[MessageRead]: pass


class IWebSocketChatsManager(ABC):
	@abstractmethod
	async def connect(self, websocket: WebSocket, chat_id: uuid.UUID) -> None: pass

	@abstractmethod
	def disconnect(self, websocket: WebSocket, chat_id: uuid.UUID) -> None: pass

	@abstractmethod
	async def send_message(self, chat_id: uuid.UUID, message: MessageRead) -> None: pass



