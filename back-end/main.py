from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .models import User, Problem
from .database import Base, engine, get_db
from .schema import UserResponse, UserCreated, ProblemResponse, ProblemCreated
from passlib.context import CryptContext
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"], 
)

Base.metadata.create_all(bind=engine)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# User Endpoints
@app.post("/create_user", response_model = UserResponse)
def create_user(user: UserCreated, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.username == user.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already taken")
    
    hashed_password = pwd_context.hash(user.password)
    new_user = User(username=user.username, password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.post("/login", response_model = UserResponse)
def create_login(user: UserCreated, db: Session = Depends(get_db)):
    userData = db.query(User).filter(User.username == user.username).first()
    if not userData:
        raise HTTPException(status_code=404, detail="User not found")
    if not pwd_context.verify(user.password, userData.password):
        raise HTTPException(status_code=400, detail="Incorrect password")
    return userData

@app.delete("/users/{user_id}")
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
    
@app.post("/create_problems", response_model=ProblemResponse)
def create_problem(problem: ProblemCreated, db: Session = Depends(get_db)):
    existing_problem = db.query(Problem).filter(Problem.title == problem.title).first()
    if existing_problem:
        raise HTTPException(status_code=400, detail="Problem already contained")
    
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

@app.delete("/problems/{problem_id}")
async def delete_problem(problem_id: int, db: Session = Depends(get_db)):
    problem = db.query(Problem).filter(Problem.id == problem_id).first()
    if problem is None:
        raise HTTPException(status_code=404, detail="Problem not found")
    db.delete(problem)
    db.commit()
    return {"message": "Problem deleted"}