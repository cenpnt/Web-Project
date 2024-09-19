from sqlalchemy import Column, Integer, String, JSON, Enum
from enum import Enum as PyEnum
from .database import Base

class UserRole(PyEnum):
    user = "user"
    admin = "admin"

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)
    role = Column(Enum(UserRole), default=UserRole.user)

class Problem(Base):
    __tablename__ = 'problems'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    output = Column(String)
    example = Column(JSON)
    note = Column(String)