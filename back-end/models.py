from sqlalchemy import Column, Integer, String, JSON, Enum, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from enum import Enum as PyEnum
from .database import Base

class UserRole(PyEnum):
    user = "user"
    admin = "admin"

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)
    role = Column(Enum(UserRole), default=UserRole.user)
    profile_pic = Column(String, nullable=True)
    bio = Column(String)
    
    # Establish relationship between User and SolvedProblem
    solved_problems = relationship("SolvedProblem", back_populates="user")
    room_reservation = relationship("Reservation", back_populates="user")
    invitations = relationship("Invitation", back_populates="user")

class Problem(Base):
    __tablename__ = 'problems'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    output = Column(String)
    example = Column(JSON)
    note = Column(String)
    
    # Establish relationship between Problem and SolvedProblem
    solved_problems = relationship("SolvedProblem", back_populates="problem")

class SolvedProblem(Base):
    __tablename__ = 'solved_problems'
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    problem_id = Column(Integer, ForeignKey('problems.id'))
    
    # Relationships
    user = relationship("User", back_populates="solved_problems")
    problem = relationship("Problem", back_populates="solved_problems")

class Reservation(Base):
    __tablename__ = 'room_reservation'
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    room_id = Column(Integer, index=True)
    date = Column(String)
    time = Column(String)
    students = Column(JSON)

    user = relationship("User", back_populates="room_reservation")

class Invitation(Base):
    __tablename__ = "invitations"
    id = Column(Integer, primary_key=True, index=True)
    sender_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    receiver_email = Column(String, nullable=False)
    token = Column(String, nullable=False, unique=True, index=True)
    status = Column(String, nullable=False, default="Pending")
    expires_at = Column(DateTime)

    user = relationship("User", back_populates="invitations")