from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .models import User
from .database import Base, engine, get_db
from .schema import UserBase, UserResponse, UserCreated
from passlib.context import CryptContext

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
    db_userID = db.query(User).filter(User.id == user_id).first()
    if db_userID is None:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(db_userID)
    db.commit()
    return { "message" : "User deleted" }