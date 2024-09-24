import React, { useState, useEffect } from "react";
import ProfileMenu from "../profileMenu/ProfileMenu";
import "./ProfileIcon.css";

function ProfileIcon({ onSignOut }) {
  const [showSignOut, setShowSignOut] = useState(false); // State to control the visibility of the Sign Out button
  const [profilePic, setProfilePic] = useState(null);

  // Toggle function to show/hide the Sign Out button
  const toggleSignOut = () => {
    setShowSignOut(!showSignOut);
  };

  useEffect(() => {
    const fetchProfilePicture = async () => {
      const userID = localStorage.getItem('userID');
      try {
        const response = await fetch(`http://localhost:8000/user/data/${userID}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Fetched Profile Picture:", data.profile_pic);

        // Only update state if profile_pic has a valid URL
        if (data.profile_pic && data.profile_pic !== 'None') {
          setProfilePic(data.profile_pic);
        } else {
          setProfilePic(null); // Explicitly set to null if no valid URL
        }
      } catch (error) {
        console.error("Error fetching profile picture: ", error);
      }
    };

    fetchProfilePicture();
  }, []);

  return (
    <div className="profile-container">
      {/* Profile Icon */}
      <button className={"ProfileIcon"} onClick={toggleSignOut}>
        {profilePic ? (
          <img src={profilePic} width={50} alt="Profile Icon" />
        ) : (
          <img src="http://localhost:8000/uploads/anonymous.png" width="50" alt="Default Profile Icon" />
        )}
      </button>

      {/* Conditionally render Sign Out button */}
      <ProfileMenu showSignOut={showSignOut} />
    </div>
  );
}

export default ProfileIcon;
