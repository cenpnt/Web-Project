import React from 'react';
import "./Navbar.css";
import Button from "../../button/Button";
import SubMenu from "./submenu/SubMenu";

function Navbar() {

  return (
    <nav className="navBar">
      <ul className="menu">
        <li>About</li>
        <li>Admission</li>
        <li>
          Program
          <SubMenu
            items={[
              ["Software-Engineering 2024", ""],
              ["KMITL-Glasgow", ""],
              ["KMITL-Queensland", ""],
              ["Exchange-Study-Abroad", ""],
              ["Internships", ""]
            ]}
          />
        </li>
        <li>
          Student
          <SubMenu
            items={[
              ["Alumni", "SE student alumni"],
              ["Career Recommendation", "SE students' advisor"]
            ]}
          />
        </li>
        <li>
          Facility
          <SubMenu
            items={[
              ["Laboratory", ""], 
              ["Lecture Room", ""], 
             ["Co-working Space", ""]
            ]}
          />
        </li>
      </ul>
      <div className="btnContainer">
        <Button text="Sign in" path="/login"/>
      </div>
    </nav>
  );
}

export default Navbar;
