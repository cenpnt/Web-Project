import React, { useEffect, useState } from "react";
import "./reserveBox.css";
import { Button } from "@chakra-ui/react";
import { CloseIcon, AddIcon } from "@chakra-ui/icons";

const getFormattedButtonDate = (date) => {
  const options = { day: "numeric", month: "short", year: "numeric" };
  return date.toLocaleDateString(undefined, options);
};

function ReservationBox({ roomName, roomImage, onClose, amenities, members }) {
  const [isReserving, setIsReserving] = useState(false);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [reserved, setReserved] = useState([]);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const dayAftertomorrow = new Date(today);
  dayAftertomorrow.setDate(today.getDate() + 2);

  useEffect(() => {
    fetchAllReservedData();
  }, []);

  const getCurrentTimeFormatted = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const getCustomFormattedDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');  // Get the day and ensure it's 2 digits
    const month = String(date.getMonth() + 1).padStart(2, '0');  // Get the month (January is 0) and ensure it's 2 digits
    const year = String(date.getFullYear()).slice(-2);  // Get the last two digits of the year
  
    return `${day}/${month}/${year}`;
  }

  const fetchAllReservedData = async () => {
    try {
      const response = await fetch('http://localhost:8000/all_reserve');
      if(!response.ok) {
        throw new Error("Problem while fetching all reserved data");
      }
      const allReserved = await response.json();
      const newReservation = allReserved.map(reservation => ({
        date: reservation.date,
        time: reservation.time,
        room_id: reservation.room_id
      }));
      setReserved(newReservation);
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  const reserveRoom = async (room_id, time) => {
    const date = new Date();
    date.setDate(date.getDate() + selectedDateIndex)
    const user_id = localStorage.getItem('userID');
    try {
      const response = await fetch('http://localhost:8000/reserve', {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({
          user_id,
          room_id,
          date: getCustomFormattedDate(date),
          time
        })
      })
      if(!response.ok) {
        throw new Error("Failed to reserve the room");
      }
      const data = await response.json();
      const newReservation = {
        date: data.date,
        time: data.time,
        room_id: data.room_id
      }
      setReserved(prev => [...prev, newReservation]);
    } catch (error) {
      console.error("Error reserving room: ", error);
    }
  }

  const threeDate = [today, tomorrow, dayAftertomorrow];

  return (
    <div className="reservation-box">
      {isReserving ? (
        <>
          <h2>Reserve {roomName}</h2>
          <form className="reservation-form">
            <label>Select Date:</label>
            <div className="date-selection">
              {threeDate.map((date, index) => (
                <Button
                  key={date.toString()}
                  onClick={() => setSelectedDateIndex(index)}
                  variant={"outline"}
                  color={selectedDateIndex === index ? "black" : "hsl(35, 100%, 50%)"}
                  bgColor={selectedDateIndex === index ? "hsl(35, 100%, 70%)" : "transparent"}
                  borderColor={selectedDateIndex === index ? "hsl(35, 100%, 70%)" : "hsl(35, 100%, 50%)"}
                  _hover={{
                    bgColor: "hsl(35, 100%, 70%)",
                    color: "black",
                    borderColor: "hsl(35, 100%, 70%)",
                  }}
                >
                  {getFormattedButtonDate(date)}
                </Button>
              ))}
            </div>

            <label>Select Time:</label>
            <div className="time-selection">
            {["12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"].map((time) => (
              <Button 
              key={time} 
              onClick={() => {
                reserveRoom(roomName.match(/\d+/)[0], time);
              }} 
              isDisabled={
                (selectedDateIndex === 0 && getCurrentTimeFormatted() > time) || 
                reserved.some(reservation => {
                  const selectedDate = threeDate[selectedDateIndex];
                  return (
                    reservation.date === getCustomFormattedDate(selectedDate) && 
                    reservation.time === time && 
                    reservation.room_id === parseInt(roomName.match(/\d+/)[0])
                  );
                })
              }
              >
              {time}
            </Button>
            ))}
            </div>
            <div className="member-box">
              <label>Invite Member <span>*require at least {members} members</span></label>
              <div>
                <Button
                  width="50px"
                  height="50px"
                  borderRadius="50%"
                  border="1px dashed gray"
                  bgColor="#f3f3f3"
                  _hover={{
                    borderColor: "black",
                    bgColor: "#f3f3f3",
                    ".add-member-icon": { color: "black" },
                  }}
                >
                  <AddIcon className="add-member-icon" color="gray" />
                </Button>
              </div>
            </div>
            <div className="form-buttons">
              <Button type="button" colorScheme="blue" mr="10px">
                Confirm Reservation
              </Button>
              <Button
                type="button"
                colorScheme="red"
                onClick={() => setIsReserving(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </>
      ) : (
        <>
          <h2>{roomName}</h2>
          {roomImage && (
            <img src={roomImage} alt={`${roomName}`} className="room-image" />
          )}
          <h3>Amenities</h3>
          <ul className="amenities-list">
            {amenities.map((amenity, index) => (
              <li key={index}>{amenity}</li>
            ))}
          </ul>
          <Button
            position="absolute"
            top="10px"
            right="10px"
            bgColor="#f8f8f8"
            onClick={onClose}
            _hover={{ bgColor: "#f8f8f8" }}
          >
            <CloseIcon></CloseIcon>
          </Button>
          <Button colorScheme="blue" onClick={() => setIsReserving(true)}>
            Reserve
          </Button>
        </>
      )}
    </div>
  );
}

export default ReservationBox;
