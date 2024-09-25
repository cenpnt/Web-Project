import React, { useState } from "react";
import "./reserveBox.css";
import { Button } from "@chakra-ui/react";
import { CloseIcon, AddIcon } from "@chakra-ui/icons";

const getFormattedButtonDate = (date) => {
  const options = { day: "numeric", month: "short", year: "numeric" };
  return date.toLocaleDateString(undefined, options);
};

function ReservationBox({ roomName, roomImage, onClose, amenities, members }) {
  const [isReserving, setIsReserving] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const dayAftertomorrow = new Date(today);
  dayAftertomorrow.setDate(today.getDate() + 2);

  const handleReserveClick = () => {
    setIsReserving(true);
  };

  const handleDateSelection = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="reservation-box">
      {isReserving ? (
        // Render the date and time selection form when reserving
        <>
          <h2>Reserve {roomName}</h2>
          <form className="reservation-form">
            <label>Select Date:</label>
            <div className="date-selection">
              <Button
                onClick={() => handleDateSelection(today)}
                variant={"outline"}
                color="hsl(35, 100%, 50%)"
                borderColor="hsl(35, 100%, 50%)"
                _hover={{
                  bgColor: "hsl(35, 100%, 70%)",
                  color: "black",
                  borderColor: "hsl(35, 100%, 70%)",
                }}
              >
                {getFormattedButtonDate(today)}
              </Button>
              <Button
                onClick={() => handleDateSelection(today)}
                variant={"outline"}
                color="hsl(35, 100%, 50%)"
                borderColor="hsl(35, 100%, 50%)"
                _hover={{
                  bgColor: "hsl(35, 100%, 70%)",
                  color: "black",
                  borderColor: "hsl(35, 100%, 70%)",
                }}
              >
                {getFormattedButtonDate(tomorrow)}
              </Button>
              <Button
                onClick={() => handleDateSelection(dayAftertomorrow)}
                variant={"outline"}
                color="hsl(35, 100%, 50%)"
                borderColor="hsl(35, 100%, 50%)"
                _hover={{
                  bgColor: "hsl(35, 100%, 70%)",
                  color: "black",
                  borderColor: "hsl(35, 100%, 70%)",
                }}
              >
                {getFormattedButtonDate(dayAftertomorrow)}
              </Button>
            </div>

            <label>Select Time:</label>
            <div className="time-selection">
              <Button>12:00</Button>
              <Button>13:00</Button>
              <Button>14:00</Button>
              <Button>15:00</Button>
              <Button>16:00</Button>
              <Button>17:00</Button>
              <Button>18:00</Button>
              <Button>19:00</Button>
              <Button>20:00</Button>
              <Button>21:00</Button>
              <Button>22:00</Button>
              <Button>23:00</Button>
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
              <Button type="buttton" colorScheme="blue" mr="10px">
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
        // Render the room details and amenities when not reserving
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
