import React from "react";
import "./Navbar.css";
import Button from "../../button/Button";
import SubMenu from "./submenu/SubMenu";
import { useAuth } from "../../../context/AuthContext";
import ProfileIcon from "../../profileIcon/ProfileIcon";

function Navbar({ theme = "dark", menuItems }) {
  const { buttonText, buttonPath, buttonClick, isLoggedIn} = useAuth();
  
  return (
    <nav className={`navBar ${theme}`}>
      <ul className="menu">
        {menuItems.map((menuItem, index) => (
          <li key={index}>
            {<a href={`${menuItem.path}`}>{menuItem.text}</a>}
            {menuItem.subItems && <SubMenu items={menuItem.subItems} />}
          </li>
        ))}
      </ul>
      <div className="btnContainer">
        {isLoggedIn ? <ProfileIcon /> : 
            <Button
            text={buttonText}
            path={buttonPath}
            theme={theme}
            onClick={buttonClick}
            />
        }
        
      </div>
    </nav>
  );
}

export default Navbar;
