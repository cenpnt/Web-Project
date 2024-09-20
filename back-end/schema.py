from pydantic import BaseModel
from typing import Dict
from .models import UserRole

class UserBase(BaseModel):
    username: str
    password: str
    role: UserRole = UserRole.user

class UserCreated(UserBase):
    pass

class UserResponse(UserBase):
    id: int
    class Config:
        from_attributes = True

class ProblemBase(BaseModel):
    title: str
    description: str
    example: Dict[str, str]
    note: str

class ProblemCreated(ProblemBase):
    pass

class ProblemResponse(ProblemBase):
    id: int
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class SolvedProblemBase(BaseModel):
    user_id: int
    problem_id: int

class SolvedProblemCreated(SolvedProblemBase):
    pass

class SolvedProblemResponse(SolvedProblemBase):
    id: int
    class Config:
        from_attributes = True