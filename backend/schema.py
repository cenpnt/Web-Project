from pydantic import BaseModel, field_validator
from typing import Dict, List
from .models import UserRole
from typing import Optional
from datetime import datetime
import pytz

class UserBase(BaseModel):
    student_id: str
    username: str
    role: UserRole = UserRole.user

class UserCreated(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    username: str
    profile_pic: Optional[str] = None
    bio: Optional[str] = None
    student_id: str
    class Config:
        from_attributes = True

class ProblemBase(BaseModel):
    title: str
    description: str
    example: Dict[str, str]
    note: str
    level: str

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
    students: List[str]

class ReservationCreated(ReservationBase):
    pass

class ReservationResponse(ReservationBase):
    id: int
    date: str
    time: str
    room_id : int
    students: List[str]
    class Config:
        from_attributes = True

class CancelReservation(BaseModel):
    room_id : int
    date: str
    time: str

class InvitationBase(BaseModel):
    sender_email: str
    sender_id: int
    receiver_email: str
    subject: str
    expires_at: datetime
    room_id: int
    date: str
    time: str

    @field_validator('expires_at', mode='before')
    def validate_expires_at(cls, value):
        # Convert the input string to a datetime object if necessary
        if isinstance(value, str):
            # Try parsing the datetime string, ensuring it handles UTC+7
            try:
                # Assuming the input string is already in ISO format with timezone info
                parsed_date = datetime.fromisoformat(value[:-6])  # Remove the offset for parsing
                parsed_date = parsed_date.replace(tzinfo=pytz.timezone('Asia/Bangkok'))  # Set UTC+7 timezone
                return parsed_date
            except ValueError:
                raise ValueError("Invalid datetime format. Please use ISO 8601 format.")
        return value

class InvitationCreated(InvitationBase):
    pass

class InvitationResponse(BaseModel):
    id: int
    sender_id: int
    receiver_email: str
    status: str
    expires_at: datetime
    room_id: int
    date: str
    time: str
    class Config:
        from_attributes = True

class AcceptInvitationRequest(BaseModel):
    token: str
    isAccept: bool