import uuid
import datetime

from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from fastapi import Depends

from app.auth.models import User
from app.auth.auth import current_active_user, get_user_from_cookie
from .schemas import ChatRead, PossibleChatRead, MessageRead 
from .interfaces import IChatsRepo, IWebSocketChatsManager




router = APIRouter(	
	prefix="/chats",
	tags=["chats"]
)


@router.get("/get_chats")
async def get_chats(user: User = Depends(current_active_user), chats_repo: IChatsRepo = Depends()) -> list[ChatRead]:
	chats = await chats_repo.get_chats(user.id)
	return chats


@router.get("/get_users")
async def get_users(nickname: str, amount: int = 10, user: User = Depends(current_active_user), chats_repo: IChatsRepo = Depends()) -> list[PossibleChatRead]:
	possible_users = await chats_repo.search_users(user.id, nickname, amount)
	return possible_users


@router.get("/get_messages")
async def get_messages(chat_id: uuid.UUID, amount: int = 10, start_time: datetime.datetime | None = None, chats_repo: IChatsRepo = Depends(), user: User = Depends(current_active_user)) -> list[MessageRead]:
	if start_time is None:
		start_time = datetime.datetime.utcnow()
	if await chats_repo.check_if_user_has_chat(chat_id, user.id):
		return await chats_repo.get_messages(chat_id, amount, start_time)
	else:
		return None


@router.post("/create_chat")
async def create_chat(id: uuid.UUID, user: User = Depends(current_active_user), chats_repo: IChatsRepo = Depends()) -> str:
	answer = await chats_repo.create_chat(user.id, id)
	return answer


async def websocket_chats_endpoint(websocket: WebSocket, chat_id: uuid.UUID, user: User, ws_manager: IWebSocketChatsManager, chats_repo: IChatsRepo):
	try:
		if await chats_repo.check_if_user_has_chat(chat_id, user.id):
			await ws_manager.connect(websocket, chat_id)
			while True:
				data = await websocket.receive_text()
				message = await chats_repo.add_message(chat_id, user.id, data)
				print(message)
				await ws_manager.send_message(chat_id, message)
		else:
			return "you do not have access to this chat"
	except WebSocketDisconnect:
		ws_manager.disconnect(websocket, chat_id)
		print("client disconnected")
