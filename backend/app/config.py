import os
from dataclasses import dataclass

from dotenv import load_dotenv




ORIGINS = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]


@dataclass
class DataBase:
	host: str
	port: str
	name: str
	user: str
	password: str

	@property
	def url(self):
		return f"postgresql+asyncpg://{self.user}:{self.password}@{self.host}:{self.port}/{self.name}"
	


@dataclass
class Auth:
	jwt_secret_key: str
	user_manager_secret_key: str


load_dotenv()


DATABASE = DataBase(
	host = os.environ.get("DB_HOST"),
	port = os.environ.get("DB_PORT"),
	name = os.environ.get("DB_NAME"),
	user = os.environ.get("DB_USER"),
	password = os.environ.get("DB_PASSWORD"),
)

TEST_DATABASE = DataBase(
	host = os.environ.get("TEST_DB_HOST"),
	port = os.environ.get("TEST_DB_PORT"),
	name = os.environ.get("TEST_DB_NAME"),
	user = os.environ.get("TEST_DB_USER"),
	password = os.environ.get("TEST_DB_PASSWORD"),
)


AUTH = Auth(
	jwt_secret_key = os.environ.get("JWT_SECRET_KEY"),
	user_manager_secret_key = os.environ.get("USER_MANAGER_SECRET_KEY")
)



