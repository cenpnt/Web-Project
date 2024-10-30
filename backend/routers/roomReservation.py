from fastapi import APIRouter, HTTPException, Depends
import os
from dotenv import load_dotenv
from datetime import datetime, timedelta
from typing import List
from ..models import Reservation
from ..main import BASE_URL_FRONTEND
from ..schema import SuccessResponse, ReservationResponse, ReservationCreated, CancelReservation
from sqlalchemy.orm import Session
from ..database import *
import asyncio
import pytz
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

load_dotenv()

router = APIRouter()

router = APIRouter(
    prefix="/roomResevation",
    tags=["roomReservation"],
)

@router.post("/reserve", response_model=ReservationResponse)
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

@router.get("/all_reservation", response_model=List[ReservationResponse])
def get_all_reservation(db: Session = Depends(get_db)):
    all_reservation = db.query(Reservation).all()
    return all_reservation

@router.delete("/cancel_reservation", response_model=SuccessResponse)
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