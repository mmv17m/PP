import uuid
import datetime
from typing import List

from sqlalchemy import Column, Integer, String, Table, ForeignKey
from sqlalchemy.orm import Mapped, relationship, mapped_column
from sqlalchemy.dialects.postgresql import UUID

from app.database import Base




class Chat(Base):
	__tablename__ = "chat"
	id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
	first_user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey('user.id', ondelete="CASCADE"), nullable=False)
	second_user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey('user.id', ondelete="CASCADE"), nullable=False)

	first_user: Mapped["User"] = relationship(back_populates="chats_1", foreign_keys=first_user_id)
	second_user: Mapped["User"] = relationship(back_populates="chats_2", foreign_keys=second_user_id)

	messages: Mapped[List["Message"]] = relationship(back_populates="chat")


class Message(Base):
	__tablename__ = "message"

	id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
	text: Mapped[str] = mapped_column(nullable=False)
	created_at: Mapped[datetime.datetime] = mapped_column(default=datetime.datetime.utcnow)

	sender_id: Mapped[uuid.UUID] = mapped_column(ForeignKey('user.id', ondelete="CASCADE"), nullable=False)
	chat_id: Mapped[uuid.UUID] = mapped_column(ForeignKey('chat.id', ondelete="CASCADE"), nullable=False)

	sender: Mapped["User"] = relationship(back_populates="messages")
	chat: Mapped[Chat] = relationship(back_populates="messages")