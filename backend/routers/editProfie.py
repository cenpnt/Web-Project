from fastapi import APIRouter, HTTPException, Depends, status, UploadFile, File
from uuid import uuid4
import os
from dotenv import load_dotenv
from ..models import User
from ..schema import CheckPasswordBase, EditProfileBase, SuccessResponse
from sqlalchemy.orm import Session
from ..database import *
from fastapi.responses import JSONResponse
from .user import admin_only
from ..config import BASE_URL_BACKEND, UPLOAD_DIR, pwd_context

load_dotenv()

router = APIRouter()

router = APIRouter(
    tags=["editProfile"],
)

@router.post("/edit_profile/check_password/{id}", response_model=SuccessResponse)
def check_password(id: int, password_data: CheckPasswordBase, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    is_valid = pwd_context.verify(password_data.password, user.password)
    if not is_valid:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid password")
    
    return {"message": "Password is correct"}

@router.put("/edit_profile/{id}", response_model=SuccessResponse)
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

@router.put("/upload_profile_pic/{id}", response_model=SuccessResponse)
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

@router.delete("/delete_profile_pic/{filename}", dependencies=[Depends(admin_only)])
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
@router.post("/upload_image/")
async def upload_image(file: UploadFile = File(...)):
    file_location = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_location, "wb") as f:
        f.write(await file.read())
    return JSONResponse(content={"filename": file.filename, "url": f"{BASE_URL_BACKEND}/uploads/{file.filename}"})