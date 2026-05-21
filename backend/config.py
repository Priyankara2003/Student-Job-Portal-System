import os

from dotenv import load_dotenv


load_dotenv()


def _require_env(name: str) -> str:
    value = os.getenv(name)
    if not value:
        raise ValueError(f"Missing required environment variable: {name}")
    return value


def build_database_url() -> str:
    user = _require_env("DB_USER")
    password = _require_env("DB_PASSWORD")
    host = _require_env("DB_HOST")
    port = os.getenv("DB_PORT", "3306")
    name = _require_env("DB_NAME")

    return f"mysql+pymysql://{user}:{password}@{host}:{port}/{name}"


def get_db_echo() -> bool:
    return os.getenv("DB_ECHO", "false").lower() == "true"
