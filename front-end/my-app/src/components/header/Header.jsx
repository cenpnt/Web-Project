import Logo from '../Logo'
import Navbar from './navbar/Navbar';
import './Header.css'

function Header() {
    return (
        <header className="header">
            <div className="top-bar">
                <div className="top-bar-left">
                    <Logo src="https://www.se.kmitl.ac.th/assets/se.png" alt="SE-logo" width="150"/>
                </div>
                <div className="top-bar-right">
                    <Navbar/>
                </div>
            </div>
        </header>
    );
}

export default Header;