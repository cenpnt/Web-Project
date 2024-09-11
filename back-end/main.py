from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .models import User
from .database import pwd_context, Base, engine, get_db, SessionLocal
from .schema import UserBase, UserResponse, UserCreated

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"], 
)

Base.metadata.create_all(bind=engine)

def add_user():
    db = SessionLocal()
    try:
        # Check if admin user already exists
        existing_user = db.query(User).filter(User.username == "admin").first()
        if existing_user:
            print("Admin user already exists.")
            return

        hashed_password = pwd_context.hash("forAdminOnly1234")
        new_user = User(username="admin", password=hashed_password)
        db.add(new_user)
        db.commit()
        print("User 'admin' added successfully.")
    except Exception as e:
        print(f"An error occurred: {e}")
        db.rollback()
    finally:
        db.close()

add_user()

# @app.post("/create_user", response_model=UserResponse)
# def create_user(user: UserCreated, db: Session = Depends(get_db)):
#     existing_user = db.query(User).filter(User.username == user.username).first()
#     if existing_user:
#         raise HTTPException(status_code=400, detail="Username already taken")
    
#     hashed_password = pwd_context.hash(user.password)
#     new_user = User(username=user.username, password=hashed_password)
#     db.add(new_user)
#     db.commit()
#     db.refresh(new_user)
#     return { "id": new_user.id, "username": new_user.username }

@app.post("/login")
def create_login(user: UserCreated, db: Session = Depends(get_db)):
    userData = db.query(User).filter(User.username == user.username).first()
    if not userData:
        raise HTTPException(status_code=404, detail="User not found")
    if not pwd_context.verify(user.password, userData.password):
        raise HTTPException(status_code=400, detail="Incorrect password")
    return userData

@app.delete("/users/{user_id}")
def delete_user(user: UserCreated, db: Session = Depends(get_db)):
    user_to_delete = db.query(User).filter(User.username == user.username).first()
    if not user_to_delete:
        raise HTTPException(status_code=404, detail="User not found")
    
    db.delete(user_to_delete)
    db.commit()
    return { "message" : "User deleted" }