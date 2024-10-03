import React, { useState, useEffect } from "react";
import ProfileMenu from "../profileMenu/ProfileMenu";
import "./ProfileIcon.css";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function ProfileIcon() {
  const [showSignOut, setShowSignOut] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const location = useLocation();
  const { internetIPAddress } = useAuth();

  // Toggle function to show/hide the Sign Out button
  const toggleSignOut = () => {
    setShowSignOut(!showSignOut);
  };

  useEffect(() => {
    const fetchProfilePicture = async () => {
      const userID = localStorage.getItem('userID');
      try {
        const response = await fetch(`${internetIPAddress}user/data/${userID}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data.profile_pic && data.profile_pic !== 'None') {
          setProfilePic(data.profile_pic);
        } else {
          setProfilePic(null);
        }
      } catch (error) {
        console.error("Error fetching profile picture: ", error);
      }
    };

    fetchProfilePicture();
  }, [location.pathname]); // Rerun the effect whenever the location changes

  return (
    <div className="profile-container"> 
      {/* Profile Icon */}
      <button className={"ProfileIcon"} onClick={toggleSignOut}>
        {profilePic ? (
          <img src={profilePic} width={50} alt="Profile Icon" />
        ) : (
          <img src={`${internetIPAddress}uploads/anonymous.png`} width="50" alt="Default Profile Icon" />
        )}
      </button>

      {/* Conditionally render Sign Out button */}
      <ProfileMenu showSignOut={showSignOut} />
    </div>
  );
}

export default ProfileIcon;
