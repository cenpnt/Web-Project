import "./Navbar.css";
import Button from "../button/Button";
import SubMenu from "../submenu/SubMenu";

function Navbar() {
    return (
      <nav className="navBar">
        <ul className="menu">
          <li>About</li>
          <li>Admission</li>
          <li>
            Program
            <SubMenu items={[
              'Software-Engineering 2024',
              'KMITL-Glasgow',
              'KMITL-Queensland',
              'Exchange-Study-Abroad',
              'Internships'
            ]} />
          </li>
          <li>
            Student
            <SubMenu items={[
              'Alumni',
              'Career Recommendation'
            ]} />
          </li>
          <li>Facility</li>
        </ul>
        <div className="btnContainer">
          <Button text="Sign in" />
        </div>
      </nav>
    );
  }

export default Navbar;