import uuid
import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, Field




class BaseError(BaseModel):
	status: int
	detail: str