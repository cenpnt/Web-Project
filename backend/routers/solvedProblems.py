from fastapi import APIRouter, HTTPException, Depends
from dotenv import load_dotenv
from typing import  List
from ..models import SolvedProblem
from ..schema import SuccessResponse, SolvedProblemResponse, SolvedProblemCreated
from sqlalchemy.orm import Session
from ..database import *
load_dotenv()

router = APIRouter()

router = APIRouter(
    prefix="/SolvedProblems",
    tags=["SolvedProblems"],
)

# SolvedProblem Endpoint
@router.post("/solved_problem", response_model=SolvedProblemResponse)
def create_solved_problem(problem: SolvedProblemCreated, db: Session = Depends(get_db)):
    existing_problem = db.query(SolvedProblem).filter(SolvedProblem.problem_id == problem.problem_id, SolvedProblem.user_id == problem.user_id, SolvedProblem.level == problem.level).first()
    if existing_problem:
        raise HTTPException(status_code=400, detail="User has already solved this problem")
    
    new_solved_problem = SolvedProblem(user_id = problem.user_id, problem_id = problem.problem_id, level = problem.level)
    db.add(new_solved_problem)
    db.commit()
    db.refresh(new_solved_problem)
    return new_solved_problem

@router.get("/all_solved_problem", response_model=List[SolvedProblemResponse])
def get_all_solved_problem(db: Session = Depends(get_db)):
    problems = db.query(SolvedProblem).all()
    return problems

@router.delete("/delete_solve_problem", response_model=SuccessResponse)
def delete_solved_problem(problem: SolvedProblemCreated, db: Session = Depends(get_db)):
    existing_problem = db.query(SolvedProblem).filter(SolvedProblem.user_id == problem.user_id, SolvedProblem.problem_id == problem.problem_id, SolvedProblem.level == problem.level).first()
    if existing_problem is None:
        raise HTTPException(status_code=404, detail="Problem not found")
    db.delete(existing_problem)
    db.commit()
    return { "message": "Problem deleted" }