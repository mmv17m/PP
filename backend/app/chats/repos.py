import uuid
import datetime
from typing import List

from sqlalchemy import text, or_, and_, desc
from sqlalchemy.future import select
from sqlalchemy.orm import joinedload, selectinload, load_only
from pydantic import parse_obj_as

from app.database import BaseSqlAlchemyRepo
from app.auth.models import User
from .interfaces import IChatsRepo
from .schemas import ChatRead, PossibleChatRead, MessageRead
from .models import Chat as Chat_model
from .models import Message




class ChatsRepo(BaseSqlAlchemyRepo, IChatsRepo):

	def _create_ChatRead(self, chat: Chat_model, user: User) -> ChatRead:
		"""Extra method to convert the data recieved in self.get_chats to pydantiv ChatRead model"""
		return ChatRead(id=chat.id, user_id=user.id, user_nickname=user.nickname, user_registration_date=user.created_at.date())

	async def get_chats(self, user_id: uuid.UUID) -> List[ChatRead]:
		"""The method to get existing chats by user_id"""
		query = (
			select(User)
			.options(selectinload(User.chats_1).joinedload(Chat_model.second_user).load_only(User.id, User.nickname, User.created_at))
			.options(selectinload(User.chats_2).joinedload(Chat_model.first_user).load_only(User.id, User.nickname, User.created_at))
			.where(User.id==user_id)
		)

		user = await self._session.scalars(query)
		user = user.first()
		chats = list(map(lambda i: self._create_ChatRead(i, i.second_user), user.chats_1)) 
		chats += list(map(lambda i: self._create_ChatRead(i, i.first_user), user.chats_2))
		return chats


	async def search_users(self, user_id: uuid.UUID, nickname: str, amount: int = 10) -> list[PossibleChatRead]:
		"""Method to search users to create new chats"""
		query = (
			select(User.id, User.nickname)
			.where(User.id != user_id)
			.filter(User.nickname.ilike("%"+nickname+"%"))
			.limit(amount)
		)
		chats = await self._session.execute(query)
		chats = chats.unique().all()
		chats = list(map(lambda i: PossibleChatRead(id=i[0], nickname=i[1]), chats))
		return chats


	#добавить проверку на несущетсвующих пользователей
	async def create_chat(self, user_id: uuid.UUID, user2_id: uuid.UUID) -> str:
		"""Method to create new chat"""
		existing_chat_query = (
			select(Chat_model)
			.where(
		       	or_(
		           	and_(Chat_model.first_user_id == user_id, Chat_model.second_user_id == user2_id),
		           	and_(Chat_model.first_user_id == user2_id, Chat_model.second_user_id == user_id),
		       	)
		    )
		)

		chats = await self._session.execute(existing_chat_query)
		chats = chats.unique().all()
		if chats:
			return "The chat already exists"

		new_chat = Chat_model(first_user_id=user_id, second_user_id=user2_id)
		self._session.add(new_chat)
		await self._session.flush()
		await self._session.commit()
		return "successful"
		

	#add cache
	async def check_if_user_has_chat(self, chat_id: uuid.UUID, user_id: uuid.UUID) -> bool:
		chat = await self._session.get(Chat_model, chat_id)
		if chat and (chat.first_user_id == user_id or chat.second_user_id == user_id):
			return True
		return False


	async def add_message(self, chat_id: uuid.UUID, user_id: uuid.UUID, text: str) -> MessageRead:
		now = datetime.datetime.utcnow()
		new_message = Message(text=text, sender_id=user_id, chat_id=chat_id, created_at=now)
		self._session.add(new_message)
		await self._session.flush()
		await self._session.commit()
		return MessageRead(id=new_message.id, text=new_message.text, created_at=new_message.created_at, sender_id=new_message.sender_id)


	async def get_messages(self, chat_id: uuid.UUID, amount: int = 10, start_time: datetime.datetime | None = None) -> list[MessageRead]:
		if start_time is None:
			start_time = datetime.datetime.utcnow()
		query = (
			select(Message)
			.where(Message.chat_id == chat_id)
			.filter(Message.created_at < start_time)
			.order_by(desc(Message.created_at))
			.limit(amount)
		)

		messages = await self._session.execute(query)
		messages = messages.scalars().unique().all()
		for i in messages:
			print(i, i.__dict__)
		messages = list(map(lambda i: MessageRead(id=i.id, text=i.text, created_at=i.created_at, sender_id=i.sender_id), messages))
		return messages