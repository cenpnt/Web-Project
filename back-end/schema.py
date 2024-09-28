from pydantic import BaseModel
from typing import Dict
from .models import UserRole
from typing import Optional

class UserBase(BaseModel):
    username: str
    password: str
    role: UserRole = UserRole.user

class UserCreated(UserBase):
    pass

class UserResponse(UserBase):
    id: int
    profile_pic: Optional[str] = None
    bio: Optional[str] = None
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

class EditProfileBase(BaseModel):
    fieldName: str
    newValue: str

class CheckPasswordBase(BaseModel):
    password: str

class SuccessResponse(BaseModel):
    message: str

class ReservationBase(BaseModel):
    user_id: int
    room_id: int
    date: str
    time: str

class ReservationCreated(ReservationBase):
    pass

class ReservationResponse(ReservationBase):
    id: int
    date: str
    time: str
    room_id : int
    class Config:
        from_attributes = True

class EmailBase(BaseModel):
    sender_email: str
    receiver_email: str
    subject: str
    message: str

class EmailCreated(EmailBase):
    pass