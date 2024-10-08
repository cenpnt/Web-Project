import React, { useEffect, useState, useCallback } from "react";
import "./reserveBox.css";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Avatar,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { CloseIcon, AddIcon } from "@chakra-ui/icons";
import Select from "react-select";
import { useAuth } from "../../context/AuthContext";

const getFormattedButtonDate = (date) => {
  const options = { day: "numeric", month: "short", year: "numeric" };
  return date.toLocaleDateString(undefined, options);
};

function ReservationBox({
  roomName,
  roomImage,
  onCloseBox,
  amenities,
  members,
}) {
  const [allInvitations, setAllInvitations] = useState([]);
  const [isReserving, setIsReserving] = useState(false);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);
  const [reserved, setReserved] = useState([]);
  const [allStudentData, setAllStudentData] = useState([]);
  const [invitedMembers, setInvitedMembers] = useState([]); // For checking duplicate only
  const [selectedStudent, setSelectedStudent] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { internetIPAddress } = useAuth();

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const dayAftertomorrow = new Date(today);
  dayAftertomorrow.setDate(today.getDate() + 2);
  const threeDate = [today, tomorrow, dayAftertomorrow];

  const extractUsername = (email) => {
    return email.split("@")[0];
  };

  const fetchInvitations = useCallback(async () => {
    try {
      const response = await fetch(`${internetIPAddress}get_all_invitation`);
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const allInvitation = await response.json();
      const newInvitation = allInvitation.map((invitation) => ({
        receiver_username: extractUsername(invitation.receiver_email),
        status: invitation.status,
      }));
      setAllInvitations(newInvitation);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }, []);

  useEffect(() => {
    fetchAllReservedData();
    fetchAllStudent();
    fetchInvitations();

    const intervalId = setInterval(() => {
      fetchInvitations();
    }, 5000); // Fetch every 5 seconds

    return () => clearInterval(intervalId);
  }, [fetchInvitations]);

  const getCurrentTimeFormatted = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const getCustomFormattedDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0"); // Get the day and ensure it's 2 digits
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Get the month (January is 0) and ensure it's 2 digits
    const year = String(date.getFullYear()).slice(-2); // Get the last two digits of the year

    return `${day}/${month}/${year}`;
  };

  const fetchAllReservedData = async () => {
    try {
      const response = await fetch(`${internetIPAddress}all_reservation`);
      if (!response.ok) {
        throw new Error("Problem while fetching all reserved data");
      }
      const allReserved = await response.json();
      const newReservation = allReserved.map((reservation) => ({
        date: reservation.date,
        time: reservation.time,
        room_id: reservation.room_id,
      }));
      setReserved(newReservation);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const reserveRoom = async (room_id, time) => {
    const date = new Date();
    date.setDate(date.getDate() + selectedDateIndex);
    const user_id = localStorage.getItem("userID");
    const studentsArr = allInvitations.map(
      (invitation) => invitation.receiver_username
    );
    try {
      const response = await fetch(`${internetIPAddress}reserve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id,
          room_id,
          date: getCustomFormattedDate(date),
          time,
          students: studentsArr,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to reserve the room");
      }
      const data = await response.json();
      const newReservation = {
        date: data.date,
        time: data.time,
        room_id: data.room_id,
      };
      setReserved((prev) => [...prev, newReservation]);
      setSelectedTime(null);
      setInvitedMembers([]);
    } catch (error) {
      console.error("Error reserving room: ", error);
    }
  };

  const fetchAllStudent = async () => {
    try {
      const response = await fetch(`${internetIPAddress}user/data/all`);
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const allUserData = await response.json();
      const newUserData = allUserData.map((user) => ({
        student_id: user.student_id,
        username: user.username,
        profile_pic: user.profile_pic,
      }));
      setAllStudentData(newUserData);
    } catch (error) {
      console.error(error);
    }
  };

  const formatToUTCPlus7 = (date) => {
    const padZero = (num) => (num < 10 ? "0" + num : num); // Helper to pad single-digit numbers
    const year = date.getFullYear();
    const month = padZero(date.getMonth() + 1); // getMonth is zero-indexed
    const day = padZero(date.getDate());
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    const seconds = padZero(date.getSeconds());
    const milliseconds = String(date.getMilliseconds()).padStart(3, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}+07:00`;
  };

  const sendInvitation = async (receiver_email) => {
    const senderID = localStorage.getItem("userID");
    const now = new Date();
    now.setHours(now.getHours() + 1); // Adds 1 hour for invitation expiration
    const expiresAt = formatToUTCPlus7(now);
    const date = new Date();
    date.setDate(date.getDate() + selectedDateIndex);

    const emailData = {
      sender_email: "softwareengineeringkmitl@gmail.com",
      sender_id: senderID,
      receiver_email: receiver_email,
      subject: "Co-Working Space Invitation",
      expires_at: expiresAt,
      room_id: roomName.match(/\d+/)[0],
      time: selectedTime,
      date: getCustomFormattedDate(date),
    };
    try {
      const response = await fetch(`${internetIPAddress}send_invitation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailData),
      });
      if (!response.ok) {
        throw new Error("Error sending email");
      }
      await fetchInvitations();
    } catch (error) {
      console.error("Error sending email: ", error);
    }
  };

  const deleteAllInvitations = async () => {
    try {
      const response = await fetch(
        `${internetIPAddress}delete_all_invitations`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("Error deleteing data");
      }
      setAllInvitations([]);
    } catch (error) {
      console.error("Error cancelling all invitation: ", error);
    }
  };

  const handleAddMember = async () => {
    let maxInvitation = 0;
    if (roomName === "Room 1" || roomName === "Room 2") {
      maxInvitation = 5;
    } else if (roomName === "Room 3") {
      maxInvitation = 10;
    }
    if (selectedStudent) {
      const isalreadyInvited = invitedMembers.some(
        (member) => member.username === selectedStudent.username
      );
      if (allInvitations.length >= maxInvitation) {
        setIsError(true);
        setErrorMessage(
          `You can only invite up to ${maxInvitation} members for ${roomName}`
        );
        return;
      }
      if (isalreadyInvited) {
        setIsError(true);
        setErrorMessage("This member is already invited.");
      } else {
        setIsError(false);
        setInvitedMembers((prev) => [...prev, selectedStudent]);
        await sendInvitation(selectedStudent.username + "@kmitl.ac.th");
        setSelectedStudent(null); // Clear the selection after adding
        onClose();
      }
    } else {
      setIsError(true);
      setErrorMessage("Please select a member to invite.");
    }
  };

  const resetState = async () => {
    setIsReserving(false);
    setInvitedMembers([]);
    setSelectedStudent(null);
    setIsError(false);
    setErrorMessage("");
    await deleteAllInvitations();
  };

  const formattedStudentData = allStudentData
    .sort((a, b) => parseInt(a.student_id) - parseInt(b.student_id))
    .map((student) => ({
      value: {
        username: student.student_id,
        profile_pic:
          student.profile_pic === null
            ? `${internetIPAddress}uploads/anonymous_dark.png`
            : student.profile_pic,
      },
      label: (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={
              student.profile_pic === null
                ? `${internetIPAddress}uploads/anonymous_dark.png`
                : student.profile_pic
            }
            alt={student.username}
            style={{
              width: "30px",
              height: "30px",
              marginRight: "10px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          {student.student_id}
        </div>
      ),
    }));

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
                  onClick={() => {
                    setSelectedDateIndex(index);
                    setSelectedTime(null);
                  }}
                  variant={"outline"}
                  color={
                    selectedDateIndex === index ? "black" : "hsl(35, 100%, 50%)"
                  }
                  bgColor={
                    selectedDateIndex === index
                      ? "hsl(35, 100%, 70%)"
                      : "transparent"
                  }
                  borderColor={
                    selectedDateIndex === index
                      ? "hsl(35, 100%, 70%)"
                      : "hsl(35, 100%, 50%)"
                  }
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
              {[
                "12:00",
                "13:00",
                "14:00",
                "15:00",
                "16:00",
                "17:00",
                "18:00",
                "19:00",
                "20:00",
                "21:00",
                "22:00",
                "23:00",
              ].map((time) => (
                <Button
                  key={time}
                  onClick={() => {
                    // reserveRoom(roomName.match(/\d+/)[0], time);
                    setSelectedTime(time);
                  }}
                  isDisabled={
                    (selectedDateIndex === 0 &&
                      getCurrentTimeFormatted() > time) ||
                    reserved.some((reservation) => {
                      const selectedDate = threeDate[selectedDateIndex];
                      return (
                        reservation.date ===
                          getCustomFormattedDate(selectedDate) &&
                        reservation.time === time &&
                        reservation.room_id ===
                          parseInt(roomName.match(/\d+/)[0])
                      );
                    })
                  }
                  color={selectedTime === time ? "black" : undefined}
                  bgColor={
                    selectedTime === time ? "hsl(35, 100%, 70%)" : undefined
                  }
                  _hover={
                    selectedTime === time ? "hsl(35, 100%, 70%)" : undefined
                  }
                >
                  {time}
                </Button>
              ))}
            </div>
            <div className="member-box">
              <label>
                Invite Member <span>*require at least {members} members</span>
              </label>
              <div>
                {allInvitations.map((member, index) => {
                  const invited = allStudentData.find(
                    (inv) => inv.student_id === member.receiver_username
                  );

                  let invitationstate = "invitationPending";
                  if (member.status === "Accept") {
                    invitationstate = "invitationAccept";
                  } else if (member.status === "Decline") {
                    invitationstate = "invitationDecline";
                  }

                  return (
                    <div
                      key={index}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      {invited && (
                        <Avatar
                          src={invited.profile_pic}
                          style={{ margin: "5px 10px" }}
                        />
                      )}
                      <div className={invitationstate}>{member.status}</div>
                    </div>
                  );
                })}
                <Button
                  width="50px"
                  height="50px"
                  borderRadius="50%"
                  border="1px dashed gray"
                  bgColor="#f3f3f3"
                  marginLeft="10px"
                  marginTop="5px"
                  _hover={{
                    borderColor: "black",
                    bgColor: "#f3f3f3",
                    ".add-member-icon": { color: "black" },
                  }}
                  onClick={onOpen}
                >
                  <AddIcon className="add-member-icon" color="gray" />
                </Button>
              </div>
            </div>
            <div className="form-buttons">
              <Button
                type="button"
                colorScheme="blue"
                mr="10px"
                onClick={() => {
                  reserveRoom(roomName.match(/\d+/)[0], selectedTime);
                  deleteAllInvitations();
                }}
                isDisabled={
                  selectedTime === null || 
                  ((roomName === "Room 1" || roomName === "Room 2") && allInvitations.length < 3) || 
                  (roomName === "Room 3" && allInvitations.length < 5) || 
                  allInvitations.some(invitation => 
                    invitation.status === "Decline" || invitation.status === "Pending"
                  )
                }
              >
                Confirm Reservation
              </Button>
              
              <Button
                type="button"
                colorScheme="red"
                onClick={() => {
                  setIsReserving(false);
                  resetState();
                }}
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
            onClick={onCloseBox}
            _hover={{ bgColor: "#f8f8f8" }}
          >
            <CloseIcon></CloseIcon>
          </Button>
          <Button colorScheme="blue" onClick={() => setIsReserving(true)}>
            Reserve
          </Button>
        </>
      )}
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setIsError(false);
        }}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Invite Member</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Select
              options={formattedStudentData}
              onChange={(selectedOption) =>
                setSelectedStudent(selectedOption.value)
              }
            />
            {/* {errorMessage} */}
            {isError && (
              <div
                style={{
                  color: "red",
                  fontSize: "12px",
                  marginTop: "10px",
                  textAlign: "center  ",
                }}
              >
                {errorMessage}
              </div>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddMember}>
              Add
            </Button>
            <Button
              colorScheme="red"
              onClick={() => {
                onClose();
                setIsError(false);
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ReservationBox;
