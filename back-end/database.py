from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.ext.declarative import declarative_base
from passlib.context import CryptContext
from sqlalchemy.orm import sessionmaker

Base = declarative_base()

# Hashing the password
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)

DATABASE_URL = "sqlite:///./universityDB.db"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def init_db():
    Base.metadata.create_all(bind=engine)
    add_user()

def add_user():
    db = SessionLocal()
    try:
        # Check if admin user already exists
        existing_user = db.query(User).filter(User.username == "admin").first()
        if existing_user:
            print("Admin user already exists.")
            return

        hashed_password = pwd_context.hash("1234")
        new_user = User(username="admin", password=hashed_password)
        db.add(new_user)
        db.commit()
        print("User 'admin' added successfully.")
    except Exception as e:
        print(f"An error occurred: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    init_db()