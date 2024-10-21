from fastapi import APIRouter, HTTPException, Depends, status
from passlib.context import CryptContext
import os
from dotenv import load_dotenv
from datetime import datetime, timedelta, timezone
from typing import Optional, List
from ..models import User, UserRole
import jwt
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from ..schema import UserRole, UserCreated, UserResponse, Token, SuccessResponse
from sqlalchemy.orm import Session
from ..database import *
load_dotenv()

router = APIRouter()

router = APIRouter(
    prefix="/users",
    tags=["users"],
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT settings
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 600
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Create JWT token
def create_access_token(user: User, expires_delta: Optional[timedelta] = None):
    to_encode = {
        "sub": user.username,
        "role": user.role.value,
        "userID": user.id
    }
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=600)

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt, expire

# Dependency to get the current user
def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"}
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        role: str = payload.get("role")
        userID: int = payload.get("userID")
        if username is None or role is None or userID is None:
            raise credentials_exception
    except jwt.PyJWTError:
        raise credentials_exception
    
    user = db.query(User).filter(User.username == username).first()
    if user is None:
        raise credentials_exception
    return user

def get_current_active_user(current_user: User = Depends(get_current_user)):
    if current_user is None:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

def admin_only(current_user: User = Depends(get_current_active_user)):
    if current_user.role != UserRole.admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have the necessary permission"
        )
    return current_user

# Login Endpoint
@router.post("/token", response_model=Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    userData = db.query(User).filter(User.username == form_data.username).first()    
    if not userData:
         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    if not pwd_context.verify(form_data.password, userData.password):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect password")

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token, expire = create_access_token(userData, expires_delta=access_token_expires)
    expires_in = int((expire - datetime.now(timezone.utc)).total_seconds())
    return {"access_token": access_token, "token_type": "bearer", "expires_in": expires_in}

# User Endpoints
@router.post("/create_user", response_model = UserResponse, dependencies=[Depends(admin_only)])
def create_user(user: UserCreated, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.username == user.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already taken")
    
    hashed_password = pwd_context.hash(user.password)
    new_user = User(username=user.username, password=hashed_password, role=user.role, student_id=user.student_id)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.get('/user/data/all', response_model=List[UserResponse])
def get_all_user_data(db: Session = Depends(get_db)):
    all_users = db.query(User).filter(User.role != UserRole.admin).all()
    return all_users

@router.get("/user/data/{id}", response_model=UserResponse)
def get_profile_data(id: int, db: Session = Depends(get_db)):
    data = db.query(User).filter(User.id == id).first()
    if data is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    data.profile_pic = f"{data.profile_pic}"
    return data

@router.delete("/users/{user_id}", response_model=SuccessResponse, dependencies=[Depends(admin_only)])
async def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(user)
    db.commit()
    return {"message": "User deleted"}