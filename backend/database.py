from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

from config import build_database_url, get_db_echo


class Base(DeclarativeBase):
    pass


engine = create_engine(
    build_database_url(),
    echo=get_db_echo(),
    pool_pre_ping=True,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
