from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from passlib.context import CryptContext
import os
from dotenv import load_dotenv
from .database import Base, engine
from .routers import user, problems, solvedProblems, editProfie, roomReservation, invitation


load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"], 
)

app.include_router(user.router)
app.include_router(problems.router)
app.include_router(solvedProblems.router)
app.include_router(editProfie.router)
app.include_router(roomReservation.router)
app.include_router(invitation.router)


# Configuration
UPLOAD_DIR = "uploads"
BASE_URL_BACKEND = "http://192.168.1.38:8000"
BASE_URL_FRONTEND = "http://192.168.1.38:3000"

# Ensure upload directory exists
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Mount the upload directory to serve files statically
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

# DB initialization
Base.metadata.create_all(bind=engine)

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")