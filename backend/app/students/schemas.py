import uuid

from pydantic import BaseModel, ConfigDict




class StudentRead(BaseModel):
	id: uuid.UUID
	nickname: str