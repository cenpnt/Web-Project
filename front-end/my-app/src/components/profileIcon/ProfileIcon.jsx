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
          src="https://cdn.discordapp.com/attachments/1280538997944225846/1283869999542308977/profileicon.png?ex=66e68add&is=66e5395d&hm=281220cc65aa6a9e7016fe2aa75dcad530693cd9d6f3239f705fcb7365d93c03&"
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
