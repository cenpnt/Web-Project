from pydantic import BaseModel

class UserBase(BaseModel):
    username: str
    password: str

class UserCreated(UserBase):
    pass

class UserResponse(UserBase):
    id: int
    class Config:
        from_attributes = True