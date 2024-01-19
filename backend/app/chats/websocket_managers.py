import uuid

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse

from .schemas import MessageRead




class ChatsManager:
    def __init__(self):
        self.active_connections: dict[uuid.UUID: list[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, chat_id: uuid.UUID) -> None:
        await websocket.accept()
        if self.active_connections.get(chat_id) and not websocket in self.active_connections[chat_id]:
            self.active_connections[chat_id].append(websocket)
        else:
            self.active_connections[chat_id] = [websocket]

    def disconnect(self, websocket: WebSocket, chat_id: uuid.UUID) -> None:
        self.active_connections[chat_id].remove(websocket)

    async def send_message(self, chat_id: uuid.UUID, message: MessageRead) -> None:
        for i in self.active_connections[chat_id]:
            new_message = message.model_dump_json()
            print(new_message, i)
            await i.send_json(new_message)

manager = ChatsManager()