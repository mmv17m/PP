import uuid

from pydantic import BaseModel, ConfigDict




class PossibleTrainerRead(BaseModel):
	id: uuid.UUID
	nickname: str


class TrainerRead(BaseModel):
	id: uuid.UUID
	nickname: str