from fastapi import APIRouter, HTTPException, Depends
from ..database import *
from ..schema import ProblemCreated, ProblemResponse, SuccessResponse
from ..models import Problem
from sqlalchemy.orm import Session
from typing import List
from .user import admin_only

router = APIRouter()

router = APIRouter(
    tags=["problems"],
)

# Problem Endpoints
@router.get("/problems/{problem_id}", response_model=ProblemResponse)
def get_problem(problem_id: int, db: Session = Depends(get_db)):
    problem = db.query(Problem).filter(Problem.id == problem_id).first()
    if problem is None:
        raise HTTPException(status_code=404, detail="Problem not found")
    return problem

@router.get("/problems", response_model=List[ProblemResponse])
def get_all_problems(db: Session = Depends(get_db)):
    problems = db.query(Problem).all()
    return problems
    
@router.post("/create_problems", response_model=ProblemResponse, dependencies=[Depends(admin_only)])
def create_problem(problem: ProblemCreated, db: Session = Depends(get_db)):
    existing_problem = db.query(Problem).filter(Problem.title == problem.title).first()
    if existing_problem:
        raise HTTPException(status_code=400, detail="Problem already exist")
    
    new_problem = Problem(
        title=problem.title,
        description=problem.description,
        example=problem.example,
        note=problem.note,
        level=problem.level
    )
    db.add(new_problem)
    db.commit()
    db.refresh(new_problem)
    return new_problem

@router.delete("/problems/{problem_id}", response_model=SuccessResponse, dependencies=[Depends(admin_only)])
async def delete_problem(problem_id: int, db: Session = Depends(get_db)):
    problem = db.query(Problem).filter(Problem.id == problem_id).first()
    if problem is None:
        raise HTTPException(status_code=404, detail="Problem not found")
    db.delete(problem)
    db.commit()
    return {"message": "Problem deleted"}