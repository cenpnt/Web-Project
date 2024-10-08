import "./UStudent.css";
import CodeDashboardBox from "../../components/codeDashboardBox/codeDashboardBox";
import Footer from "../../components/footer/Footer";
import React, { useEffect } from "react";
import { useState } from "react";
import "react-multi-carousel/lib/styles.css";
import Button from "../../components/button/Button";
import { useAuth } from "../../context/AuthContext";

function UStudent() {
  const [username, setUsername] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const { internetIPAddress } = useAuth();
  const [allReservation, setAllReservation] = useState([]);
  const [studentID, setStudentID] = useState("");
  const [allEasyProblems, setAllEasyProblems] = useState({all: 0, solved: 0});
  const [allMediumProblems, setAllMediumProblems] = useState({all: 0, solved: 0});
  const [allHardProblems, setAllHardProblems] = useState({all: 0, solved: 0});
  const pics = `${internetIPAddress}uploads/co-room3.jpg`;

  useEffect(() => {
    fetchUser();
    setCurrentDate(getCurrentDate());
    fetchAllReservation();
    fetchQuestionAndSolvedQuestion();
  }, []);

  const fetchAllReservation = async () => {
    try {
      const response = await fetch(`${internetIPAddress}all_reservation`);
      if (!response.ok) {
        throw new Error("Error fetching all reservation");
      }
      const data = await response.json();
      const newReserve = data.map((reservation) => ({
        room_id: reservation.room_id,
        date: reservation.date,
        time: reservation.time,
        students: reservation.students,
      }));
      setAllReservation(newReserve);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const fetchQuestionAndSolvedQuestion = async () => {
    const userID = localStorage.getItem("userID");
      try {
        const problemResponse = await fetch(`${internetIPAddress}problems`);
        const solvedProblemResponse = await fetch(`${internetIPAddress}all_solved_problem`);
        if (!problemResponse.ok || !solvedProblemResponse.ok) {
          throw new Error('Cannot fetch the problems');
        }
        const allProblems = await problemResponse.json();
        const EasyProblem = allProblems.filter(problem => problem.level === 'Easy');
        const MediumProblem = allProblems.filter(problem => problem.level === 'Medium');
        const HardProblem = allProblems.filter(problem => problem.level === 'Hard');

        const allSolvedProblems = await solvedProblemResponse.json();
        const solvedEasyProblem = allSolvedProblems.filter(problem => problem.level === 'Easy' && problem.user_id === parseInt(userID));
        const solvedMediumProblem = allSolvedProblems.filter(problem => problem.level === 'Medium' && problem.user_id === parseInt(userID));
        const solvedHardProblem = allSolvedProblems.filter(problem => problem.level === 'Hard' && problem.user_id === parseInt(userID));
  
        setAllEasyProblems((prev) => ({
          ...prev,
          all: EasyProblem.length,
          solved: solvedEasyProblem.length
        }));
        setAllMediumProblems((prev) => ({
          ...prev,
          all: MediumProblem.length,
          solved: solvedMediumProblem.length
        }));
        setAllHardProblems((prev) => ({
          ...prev,
          all: HardProblem.length,
          solved: solvedHardProblem.length
        }));
  
      } catch (error) {
        console.error('Error fetching the problems:', error);
      }
  }

  const fetchUser = async () => {
    const userID = localStorage.getItem("userID");
    try {
      const response = await fetch(`${internetIPAddress}user/data/${userID}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setUsername(data.username);
      setStudentID(data.student_id);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const getCurrentDate = () => {
    const date = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const userReservations = allReservation.filter((reservation) =>
    reservation.students.includes(studentID)
  );

  const compareDate = (reservation) => {
    const curDate = new Date();
    const reserveDate = getReservationDateTime(reservation);
    return curDate < reserveDate; 
  };

  const getReservationDateTime = (reservation) => {
    const reserveDateStr = reservation.date;
    const reserveTimeStr = reservation.time;
  
    const day = reserveDateStr.slice(0, 2);
    const month = reserveDateStr.slice(3, 5);
    const year = '20' + reserveDateStr.slice(6, 8);
    const hours = reserveTimeStr.slice(0, 2);
    const minutes = reserveTimeStr.slice(3, 5);
  
    return new Date(year, month - 1, day, hours, minutes);
  };

  const Easy = { header: "Easy", percent: ((allEasyProblems.solved / allEasyProblems.all ) * 100 ).toFixed(2), solved: allEasyProblems.solved, all: allEasyProblems.all };
  const Medium = { header: "Medium", percent: ((allMediumProblems.solved / allMediumProblems.all ) * 100 ).toFixed(2), solved: allMediumProblems.solved, all: allMediumProblems.all };
  const Hard = { header: "Hard", percent: ((allHardProblems.solved / allHardProblems.all ) * 100 ).toFixed(2), solved: allHardProblems.solved, all: allHardProblems.all };


  return (
    <div className="ustudent-container">
      <div className="welcomeBackContainer">
        <div className="displayDate">{currentDate}</div>
        <h1>Welcome back, {username}!</h1>
        <div className="displayQuote">
          Always stay updated in your student dashboard
        </div>
      </div>
      <h3>Code Editor</h3>
      <div className="codeEditorSection">
        
        <div style={{display: "flex", justifyContent: "center", padding: "20px", marginLeft: "auto", marginRight: "auto", gap: "50px"}}>
              <CodeDashboardBox codeTopic={Easy} />
              <CodeDashboardBox codeTopic={Medium} />
              <CodeDashboardBox codeTopic={Hard} />
        </div>
      </div>
      <div className="coWorkingSpaceSection">
        <h3>Co-Working Space</h3>
        <div className="coWorkingSpaceBox">
          <div className="coWorkingSpace1">
            <h4>Your Reservation</h4>
            {userReservations.length > 0 ? (
              userReservations
              .filter((reservation) => compareDate(reservation))
              .sort((a, b) => getReservationDateTime(a) - getReservationDateTime(b))  
              .map((reservation, index) => (
                <div key={index} className="reservationDetails">
                  <h5>
                    Date: {reservation.date} | Time: {reservation.time} | Room:{" "}
                    {reservation.room_id}
                  </h5>
                </div>
              ))
            ) : (
              <div>No reservation</div>
            )}
          </div>
          <div className="coWorkingSpace2">
            <h4>Book your room now!</h4>
            <img src={pics} alt="" />
            <Button text={"Reserve"} path={"/coworkingspace"} override />
          </div>
        </div>
      </div>

      <Footer theme={"dark"} />
    </div>
  );
}

export default UStudent;
