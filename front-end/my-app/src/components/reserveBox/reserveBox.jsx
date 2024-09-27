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
  const [selectedDateIndex, setSelectedDateIndex] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [reserved, setReserved] = useState([]);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const dayAftertomorrow = new Date(today);
  dayAftertomorrow.setDate(today.getDate() + 2);

  useEffect(() => {
    fetchAllReservedData();
  }, []);

  const handleReserveClick = () => {
    setIsReserving(true);
  };

  const getCurrentTimeFormatted = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const fetchAllReservedData = async () => {
    try {
      const response = await fetch('http://localhost:8000/all_reserve');
      if(!response.ok) {
        throw new Error("Problem while fetching all reserved data");
      }
      const allReserved = await response.json();
      setReserved(allReserved);
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  const reserveRoom = async (room_id) => {
    const user_id = localStorage.getItem('user_id');
    const currentTime = getCurrentTimeFormatted();
    try {
      const response = await fetch('http://localhost:8000/reserve', {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({
          user_id,
          room_id,
          data: selectedDateIndex,
          time: currentTime
        })
      })
      if(!response.ok) {
        throw new Error("Failed to reserve the room");
      }
    } catch (error) {
      console.error("Error reserving room: ", error);
    }
  }

  return (
    <div className="reservation-box">
      {isReserving ? (
        <>
          <h2>Reserve {roomName}</h2>
          <form className="reservation-form">
            <label>Select Date:</label>
            <div className="date-selection">
              {[today, tomorrow, dayAftertomorrow].map((date, index) => (
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
                <Button key={time} onClick={() => setSelectedTime(time)} isDisabled={getCurrentTimeFormatted() > time}>{time}</Button>
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
          <Button colorScheme="blue" onClick={handleReserveClick}>
            Reserve
          </Button>
        </>
      )}
    </div>
  );
}

export default ReservationBox;
