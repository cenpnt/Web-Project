import './Navbar.css'
import Button from '../button/Button'

function Navbar() {
    return (
        <nav className="navBar">
            <ul>
                <li>About</li>
                <li>Program</li>
                <li>Facility</li>
                <li>Career recommendation</li>
                <li><Button text="Sign in"/></li>
            </ul>
        </nav>
    );
}

export default Navbar