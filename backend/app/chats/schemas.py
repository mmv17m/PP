import uuid
import datetime

from pydantic import BaseModel, ConfigDict




class ChatRead(BaseModel):
	id: uuid.UUID
	user_id: uuid.UUID
	user_nickname: str
	user_registration_date: datetime.date


class PossibleChatRead(BaseModel):
	id: uuid.UUID
	nickname: str


class MessageRead(BaseModel):
	id: uuid.UUID
	text: str
	created_at: datetime.datetime
	sender_id: uuid.UUID