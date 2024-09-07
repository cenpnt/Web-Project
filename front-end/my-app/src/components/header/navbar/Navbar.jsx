import React from 'react';
import './Navbar.css';
import Button from '../../button/Button';
import SubMenu from './submenu/SubMenu';
import { useAuth } from '../../../context/AuthContext';

function Navbar({ theme = 'dark' }) {
  const { buttonText, buttonPath, buttonClick } = useAuth();

  return (
    <nav className={`navBar ${theme}`}>
      <ul className="menu">
        <li>About</li>
        <li>Admission</li>
        <li>
          Program
          <SubMenu
            items={[
              { text: "Software-Engineering 2024", path: "/", smalltext: "" },
              { text: "KMITL-Glasgow", path: "/glasgow-doubledegree", smalltext: "" },
              { text: "KMITL-Queensland", path: "/queensland-doubledegree", smalltext: "" },
              { text: "Exchange-Study-Abroad", path: "/", smalltext: "" },
              { text: "Internships", path: "/", smalltext: "" }
            ]}
          />
        </li>
        <li>
          Student
          <SubMenu
            items={[
              { text:"Alumni", path: "/", smalltext:"SE student alumni" },
              { text:"Career Recommendation", path: "/" ,smalltext:"SE students' advisor" }
            ]}
          />
        </li>
        <li>
          Facility
          <SubMenu
            items={[
              { text: "Laboratory", path: "/", smalltext: "" }, 
              { text: "Lecture Room", path: "/", smalltext: "" }, 
              { text:"Co-working Space", path:"/" , smalltext:"" }
            ]}
          />
        </li>
      </ul>
      <div className="btnContainer">
        <Button text={buttonText} path={buttonPath} theme={theme} onClick={buttonClick}/>
      </div>
    </nav>
  );
}

export default Navbar;
