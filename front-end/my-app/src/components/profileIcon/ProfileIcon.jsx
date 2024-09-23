import React, { useState } from "react";
import Button from "../button/Button";
import ProfileMenu from "../profileMenu/ProfileMenu";
import { profileMenu } from "../../constants";
import SubMenu from "../header/navbar/submenu/SubMenu";
import "./ProfileIcon.css";

function ProfileIcon({ onSignOut }) {
  // State to control the visibility of the Sign Out button
  const [showSignOut, setShowSignOut] = useState(false);

  // Toggle function to show/hide the Sign Out button
  const toggleSignOut = () => {
    setShowSignOut(!showSignOut);
  };

  return (
    <div className="profile-container">
      {/* Profile Icon */}
      <button className={"ProfileIcon"} onClick={toggleSignOut}>
        <img
          src="https://instagram.fbkk22-1.fna.fbcdn.net/v/t1.15752-9/423063124_412325167940689_1360113152861860307_n.png?stp=dst-png_s403x403&_nc_cat=101&ccb=1-7&_nc_sid=0024fc&_nc_ohc=7a2feRAfE88Q7kNvgGSKS2i&_nc_ht=instagram.fbkk22-1.fna&_nc_gid=ARjrtvajyDsYhWLKO91EmuR&oh=03_Q7cD1QHfGzBu51Ig93BOro_n1PqGmgRFg5OekQaVUyae6QvQAg&oe=670E1B4A"
          width={50}
          alt="Profile Icon"
        />
      </button>

      {/* Conditionally render Sign Out button */}
        <ProfileMenu showSignOut={showSignOut}/>
    </div>
  );
}

export default ProfileIcon;
