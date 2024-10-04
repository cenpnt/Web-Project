from fastapi import FastAPI, Depends, HTTPException, status, UploadFile, File, BackgroundTasks
from uuid import uuid4
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
from datetime import datetime, timedelta, timezone
from typing import List, Optional
import jwt
import os
import smtplib
import secrets
import asyncio
import pytz
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
from .models import User, Problem, UserRole, SolvedProblem, Reservation, Invitation
from .database import Base, engine, get_db
from .schema import UserResponse, UserCreated, ProblemResponse, ProblemCreated, Token, SolvedProblemCreated, SolvedProblemResponse, EditProfileBase, SuccessResponse, CheckPasswordBase, ReservationCreated, ReservationResponse, InvitationCreated, InvitationResponse, AcceptInvitationRequest, CancelReservation
load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"], 
)
# Configuration
UPLOAD_DIR = "uploads"
BASE_URL_BACKEND = "http://192.168.1.35:8000"
BASE_URL_FRONTEND = "http://192.168.1.35:3000"

# Ensure upload directory exists
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Mount the upload directory to serve files statically
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

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
    new_user = User(username=user.username, password=hashed_password, role=user.role, student_id=user.student_id)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.get('/user/data/all', response_model=List[UserResponse])
def get_all_user_data(db: Session = Depends(get_db)):
    all_users = db.query(User).filter(User.role != UserRole.admin).all()
    return all_users

@app.get("/user/data/{id}", response_model=UserResponse)
def get_profile_data(id: int, db: Session = Depends(get_db)):
    data = db.query(User).filter(User.id == id).first()
    if data is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    data.profile_pic = f"{data.profile_pic}"
    return data

@app.delete("/users/{user_id}", response_model=SuccessResponse, dependencies=[Depends(admin_only)])
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
def get_all_problems(db: Session = Depends(get_db)):
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
        note=problem.note,
        level=problem.level
    )
    db.add(new_problem)
    db.commit()
    db.refresh(new_problem)
    return new_problem

@app.delete("/problems/{problem_id}", response_model=SuccessResponse, dependencies=[Depends(admin_only)])
async def delete_problem(problem_id: int, db: Session = Depends(get_db)):
    problem = db.query(Problem).filter(Problem.id == problem_id).first()
    if problem is None:
        raise HTTPException(status_code=404, detail="Problem not found")
    db.delete(problem)
    db.commit()
    return {"message": "Problem deleted"}

# SolvedProblem Endpoint
@app.post("/solved_problem", response_model=SolvedProblemResponse)
def create_solved_problem(problem: SolvedProblemCreated, db: Session = Depends(get_db)):
    existing_problem = db.query(SolvedProblem).filter(SolvedProblem.problem_id == problem.problem_id, SolvedProblem.user_id == problem.user_id).first()
    if existing_problem:
        raise HTTPException(status_code=400, detail="User has already solved this problem")
    
    new_solved_problem = SolvedProblem(user_id = problem.user_id, problem_id = problem.problem_id, level = problem.level)
    db.add(new_solved_problem)
    db.commit()
    db.refresh(new_solved_problem)
    return new_solved_problem

@app.get("/all_solved_problem", response_model=List[SolvedProblemResponse])
def get_all_solved_problem(db: Session = Depends(get_db)):
    problems = db.query(SolvedProblem).all()
    return problems

@app.delete("/solve_problem/{id}", response_model=SuccessResponse, dependencies=[Depends(admin_only)])
def delete_solved_problem(id: int, db: Session = Depends(get_db)):
    problem = db.query(SolvedProblem).filter(SolvedProblem.id == id).first()
    if problem is None:
        raise HTTPException(status_code=404, detail="Problem not found")
    db.delete(problem)
    db.commit()
    return { "message": "Problem deleted" }

# Edit Profile Endpoints
@app.post("/edit_profile/check_password/{id}", response_model=SuccessResponse)
def check_password(id: int, password_data: CheckPasswordBase, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    is_valid = pwd_context.verify(password_data.password, user.password)
    if not is_valid:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid password")
    
    return {"message": "Password is correct"}

@app.put("/edit_profile/{id}", response_model=SuccessResponse)
def edit_profile(id: int, profile_data: EditProfileBase, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    allowed_field = ['username', 'password', 'profile_pic', 'bio']
    if profile_data.fieldName not in allowed_field:
        raise HTTPException(status_code=400, detail="Invalid field name")
    
    if profile_data.fieldName == 'password':
        hashed_password = pwd_context.hash(profile_data.newValue)
        setattr(user, "password", hashed_password)
    else:
        setattr(user, profile_data.fieldName, profile_data.newValue)

    db.commit()
    return { "message": f"{profile_data.fieldName} has been changed" }

@app.put("/upload_profile_pic/{id}", response_model=SuccessResponse)
def upload_profile_pic(id: int, file: UploadFile = File(...), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Generate a unique filename
    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid4()}{file_extension}"
    file_location = os.path.join(UPLOAD_DIR, unique_filename)

    # Save the file
    with open(file_location, "wb+") as file_object:
        file_object.write(file.file.read())

    # Generate the file URL
    file_url = f"{BASE_URL_BACKEND}/uploads/{unique_filename}"
    
    # Update the user's profile_pic field with the file URL
    user.profile_pic = file_url
    db.commit()
    return { "message": "Profile picture updated successfully", "file_url": file_url }

@app.delete("/delete_profile_pic/{filename}", dependencies=[Depends(admin_only)])
def delete_profile_picture(filename: str):
    file_path = os.path.join(UPLOAD_DIR, filename)
    
    try:
        if os.path.exists(file_path):
            os.remove(file_path)
            return JSONResponse(status_code=200, content={"message": "File deleted successfully"})
        else:
            raise HTTPException(status_code=404, detail="File not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

# Server Endpoint
@app.post("/upload_image/")
async def upload_image(file: UploadFile = File(...)):
    file_location = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_location, "wb") as f:
        f.write(await file.read())
    return JSONResponse(content={"filename": file.filename, "url": f"{BASE_URL_BACKEND}/uploads/{file.filename}"})

# Room Reservation Endpoints
@app.post("/reserve", response_model=ReservationResponse)
def create_reserve(reserve: ReservationCreated, db: Session = Depends(get_db)):
    existing_reserve = db.query(Reservation).filter(Reservation.room_id == reserve.room_id, Reservation.time == reserve.time, Reservation.date == reserve.date).first()
    if existing_reserve:
        raise HTTPException(status_code=400, detail="Room has already been reserved")
    
    new_reserve = Reservation(
        user_id = reserve.user_id,
        room_id = reserve.room_id,
        date = reserve.date,
        time =  reserve.time,
        students = reserve.students
    )
    db.add(new_reserve)
    db.commit()
    db.refresh(new_reserve)
    return new_reserve

@app.get("/all_reservation", response_model=List[ReservationResponse])
def get_all_reservation(db: Session = Depends(get_db)):
    all_reservation = db.query(Reservation).all()
    return all_reservation

@app.delete("/cancel_reservation", response_model=SuccessResponse)
def cancel_reservation(request: CancelReservation, db: Session = Depends(get_db)):
    reserved = db.query(Reservation).filter(Reservation.room_id == request.room_id, Reservation.date == request.date, Reservation.time == request.time).first()
    if reserved is None:
        raise HTTPException(status_code=404, detail="Reservation not found")
    
    db.delete(reserved)
    db.commit()
    return { "message": "Reservation has been canceled" }    

async def send_delayed_email(sender_email: str, receiver_email: str, date: str, time: str, room_id: int, db: Session):
    print(f"send_delayed_email called for date: {date}, time: {time}, room_id: {room_id}")
    
    try:
        parsed_date = datetime.strptime(date, "%d/%m/%y")
        formatted_date = parsed_date.strftime("%Y-%m-%d")

        # Create a timezone object for UTC+7
        thailand_tz = pytz.timezone("Asia/Bangkok")

        # Create reservation datetime in UTC+7
        reservation_datetime = thailand_tz.localize(datetime.strptime(f"{formatted_date} {time}", "%Y-%m-%d %H:%M"))

        # Calculate send time (15 minutes before reservation)
        send_time = reservation_datetime - timedelta(minutes=15)

        # Get current time in UTC+7
        now = datetime.now(thailand_tz)

        # Calculate delay
        delay_seconds = (send_time - now).total_seconds()

        if delay_seconds > 0:
            print(f"Waiting for {delay_seconds} seconds before attempting to send email...")
            await asyncio.sleep(delay_seconds)
        else:
            print("It's past the scheduled time for sending the email; sending immediately.")

        reservation = db.query(Reservation).filter(
            Reservation.date == date, 
            Reservation.time == time, 
            Reservation.room_id == room_id
        ).first()

        if not reservation:
            print(f"Reservation not found for date: {date}, time: {time}, room_id: {room_id}")
            return
        
        msg = MIMEMultipart()
        msg['From'] = "SE KMITL"
        msg['To'] = receiver_email
        msg['Subject'] = f"Upcoming Reservation Reminder: Room {reservation.room_id} Reservation on {reservation.date} at {reservation.time}"
        link = f"{BASE_URL_FRONTEND}/cancel_reservation?room_id={reservation.room_id}&date={reservation.date}&time={reservation.time}"
        html_content = f"""
        <html>
            <body>
                <p>Dear Student,</p>
                <p>This is a reminder that you have an upcoming room reservation scheduled as follows:</p>
                <h3>Reservation Details:</h3>
                <ul>
                    <li><strong>Room ID:</strong> {reservation.room_id}</li>
                    <li><strong>Date:</strong> {reservation.date}</li>
                    <li><strong>Time:</strong> {reservation.time}</li>
                </ul>
                <p>If you would like to cancel your reservation, please click the link below:</p>
                <p>
                    <a href="{link}">
                        Cancel Reservation
                    </a>
                </p>
                <p>If you have any questions or need assistance, feel free to reply to this email.</p>
                <p>Thank you!</p>
                <p>Best regards,<br>Software Engineering KMITL</p>
            </body>
        </html>
        """
        msg.attach(MIMEText(html_content, 'html'))

        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(sender_email, os.getenv("APP_PASSWORD"))
        server.sendmail(sender_email, receiver_email, msg.as_string())
        server.quit()
        print(f"Reminder email sent successfully for reservation on {date} at {time}")

    except Exception as e:
        print(f"Error in send_delayed_email: {str(e)}")

# Invitation Endpoint
@app.post('/send_invitation', response_model=SuccessResponse)
def send_invitation(invitation: InvitationCreated, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    token = secrets.token_urlsafe(32)
    expires_at = datetime.now(timezone.utc) + timedelta(hours=8)
    new_invitation = Invitation(
        sender_id=invitation.sender_id,
        receiver_email=invitation.receiver_email,
        token=token,
        status='Pending',
        expires_at=expires_at,
        room_id=invitation.room_id,
        date=invitation.date,
        time=invitation.time
    )
    db.add(new_invitation)
    db.commit()

    msg = MIMEMultipart()
    msg['From'] = "SE KMITL"
    msg['To'] = invitation.receiver_email
    msg['Subject'] = invitation.subject
    link = f"{BASE_URL_FRONTEND}/accept_invitation?token={token}"
    html_content = f"""
    <html>
        <body>
            <p>Dear Student,</p>
            <p>We are pleased to inform you that you have been invited to utilize the coworking space.</p>
            <p>To accept this invitation, please click the link below:</p>
            <p>
                <a href="{link}">Accept Invitation</a>
            </p>
            <p>Thank you, and we look forward to welcoming you!</p>
            <p>Best regards,<br>Software Engineering KMITL</p>
        </body>
    </html>
    """
    msg.attach(MIMEText(html_content, 'html'))
    
    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(invitation.sender_email, os.getenv("APP_PASSWORD"))
        server.sendmail(invitation.sender_email, invitation.receiver_email, msg.as_string())
        server.quit()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to send email: {str(e)}")
    background_tasks.add_task(send_delayed_email, invitation.sender_email, invitation.receiver_email, invitation.date, invitation.time, invitation.room_id, db)
    
    return {"message": "Invitation sent successfully"}

@app.put('/accept_invitation', response_model=InvitationResponse)
def accept_invitation(request: AcceptInvitationRequest, db: Session = Depends(get_db)):
    invitation = db.query(Invitation).filter(Invitation.token == request.token).first()
    if not invitation:
        raise HTTPException(status_code=404, detail="Invitation not found")
    if invitation.status != 'Pending':
        raise HTTPException(status_code=400, detail="Invitation already processed")
    # Ensure `expires_at` is timezone aware
    if invitation.expires_at.tzinfo is None:
        invitation.expires_at = invitation.expires_at.replace(tzinfo=timezone.utc)

    if invitation.expires_at < datetime.now(timezone.utc):
        raise HTTPException(status_code=400, detail="Invitation has expired")
    if request.isAccept == True:
        setattr(invitation, "status", "Accept")
    else:
        setattr(invitation, "status", "Decline")
    
    db.commit()
    
    return invitation

@app.get('/get_all_invitation', response_model=List[InvitationResponse])
def get_all_invitation(db: Session = Depends(get_db)):
    all_invitation = db.query(Invitation).all()
    return all_invitation

@app.delete('/delete_all_invitations', response_model=SuccessResponse)
def delete_all_invitations(db: Session = Depends(get_db)):
    try:
        db.query(Invitation).delete()
        db.commit()
        return {"message": "Data deleted"}
    except Exception as e:
        db.rollback()  # Rollback in case of error
        raise HTTPException(status_code=500, detail=str(e))