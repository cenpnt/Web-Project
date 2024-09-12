import React, { useState } from "react";
import Button from "../button/Button";
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
          src="https://cdn.discordapp.com/attachments/1280538997944225846/1283869999542308977/profileicon.png?ex=66e4909d&is=66e33f1d&hm=854612ee8ed84f57f29fbd3f858de937cfc22d2bf84f142640f0a87795226449&"
          width={50}
          alt="Profile Icon"
        />
      </button>

      {/* Conditionally render Sign Out button */}
      <div className={`signOutContainer ${showSignOut ? "show" : "hide"}`}>
        <Button text={"Sign Out"} path={"/"} onClick={onSignOut}/>
      </div>
    </div>
  );
}

export default ProfileIcon;
