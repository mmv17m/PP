import uuid

from fastapi import FastAPI, Response, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Depends

from app.config import ORIGINS
from app.dependencies import create_dependencies
from app.auth.models import User
from app.auth.auth import current_active_user, get_user_from_cookie
from app.router import connect_routers
from app.chats.router import websocket_chats_endpoint
from app.chats.interfaces import IChatsRepo, IWebSocketChatsManager




def create_app() -> FastAPI:
	app = FastAPI()
	app.add_middleware(
	    CORSMiddleware,
	    allow_origins=ORIGINS,
	    allow_credentials=True,
	    allow_methods=["GET", "POST", "HEAD", "OPTIONS"],
	    allow_headers=["Set-Cookie", "Access-Control-Allow-Headers", 'Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],
	)

	return app


app = create_app()

def main() -> None:
	connect_routers(app)
	create_dependencies(app)

main()


#this is fastapi bug, I have to do that
@app.websocket("/chats_ws/{chat_id}")
async def websocket_endpoint(websocket: WebSocket, chat_id: uuid.UUID, user: User = Depends(get_user_from_cookie), ws_manager: IWebSocketChatsManager = Depends(), chats_repo: IChatsRepo = Depends()):
	await websocket_chats_endpoint(websocket, chat_id, user, ws_manager=ws_manager, chats_repo=chats_repo)
