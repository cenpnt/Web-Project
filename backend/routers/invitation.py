from fastapi import APIRouter, HTTPException, Depends, BackgroundTasks
import os
from dotenv import load_dotenv
from datetime import datetime, timedelta, timezone
from typing import  List
from ..models import Invitation
from ..schema import SuccessResponse, InvitationCreated, AcceptInvitationRequest, InvitationResponse
from sqlalchemy.orm import Session
from ..database import *
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from .roomReservation import send_delayed_email
import secrets
from ..main import BASE_URL_FRONTEND

load_dotenv()

router = APIRouter()

router = APIRouter(
    prefix="/invitation",
    tags=["invitation"],
)

@router.post('/send_invitation', response_model=SuccessResponse)
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

@router.put('/accept_invitation', response_model=InvitationResponse)
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

@router.get('/get_all_invitation', response_model=List[InvitationResponse])
def get_all_invitation(db: Session = Depends(get_db)):
    all_invitation = db.query(Invitation).all()
    return all_invitation

@router.delete('/delete_all_invitations', response_model=SuccessResponse)
def delete_all_invitations(db: Session = Depends(get_db)):
    try:
        db.query(Invitation).delete()
        db.commit()
        return {"message": "Data deleted"}
    except Exception as e:
        db.rollback()  # Rollback in case of error
        raise HTTPException(status_code=500, detail=str(e))