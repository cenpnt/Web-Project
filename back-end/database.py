from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from passlib.context import CryptContext
from sqlalchemy.orm import sessionmaker

# Hashing the password
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

DATABASE_URL = "sqlite:///./universityDB.db"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()