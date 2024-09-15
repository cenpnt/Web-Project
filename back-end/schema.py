from pydantic import BaseModel
from typing import Dict

class UserBase(BaseModel):
    username: str
    password: str

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