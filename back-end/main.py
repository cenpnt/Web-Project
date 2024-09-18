from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
from datetime import datetime, timedelta, timezone
from typing import List, Optional
import jwt
import os
from dotenv import load_dotenv
from .models import User, Problem, UserRole
from .database import Base, engine, get_db
from .schema import UserResponse, UserCreated, ProblemResponse, ProblemCreated, Token
load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"], 
)
# DB initialization
Base.metadata.create_all(bind=engine)

# Password hashing
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
        "role": user.role.value
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
        if username is None or role is None:
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
@app.post("/token", response_model=Token)
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
@app.post("/create_user", response_model = UserResponse, dependencies=[Depends(admin_only)])
def create_user(user: UserCreated, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.username == user.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already taken")
    
    hashed_password = pwd_context.hash(user.password)
    new_user = User(username=user.username, password=hashed_password, role=user.role)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.delete("/users/{user_id}", dependencies=[Depends(admin_only)])
async def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(user)
    db.commit()
    return {"message": "User deleted"}

# Problem Endpoints
@app.get("/problems/{problem_id}", response_model=ProblemResponse)
def get_problem(problem_id: int, db: Session = Depends(get_db)):
    problem = db.query(Problem).filter(Problem.id == problem_id).first()
    if problem is None:
        raise HTTPException(status_code=404, detail="Problem not found")
    return problem

@app.get("/problems", response_model=List[ProblemResponse])
def get_allProblems(db: Session = Depends(get_db)):
    problems = db.query(Problem).all()
    return problems
    
@app.post("/create_problems", response_model=ProblemResponse, dependencies=[Depends(admin_only)])
def create_problem(problem: ProblemCreated, db: Session = Depends(get_db)):
    existing_problem = db.query(Problem).filter(Problem.title == problem.title).first()
    if existing_problem:
        raise HTTPException(status_code=400, detail="Problem already exist")
    
    new_problem = Problem(
        title=problem.title,
        description=problem.description,
        example=problem.example,
        note=problem.note
    )
    db.add(new_problem)
    db.commit()
    db.refresh(new_problem)
    return new_problem

@app.delete("/problems/{problem_id}", dependencies=[Depends(admin_only)])
async def delete_problem(problem_id: int, db: Session = Depends(get_db)):
    problem = db.query(Problem).filter(Problem.id == problem_id).first()
    if problem is None:
        raise HTTPException(status_code=404, detail="Problem not found")
    db.delete(problem)
    db.commit()
    return {"message": "Problem deleted"}