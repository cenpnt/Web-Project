import React from 'react';
import Logo from '../Logo'
import Navbar from './navbar/Navbar';
import './Header.css'
import { useAuth } from '../../context/AuthContext';
import { loggedInMenuItems } from '../../constants';

function Header({ theme, menuItems }) {
    const { buttonText, buttonPath, buttonClick, isLoggedIn } = useAuth();
    const {internetIPAddress} = useAuth();

    return (
        <header className={`header ${theme}`}>
            {}
            <div className="top-bar">
                <div className="top-bar-left">
                    <div className='logoContainer'>
                        <a href={isLoggedIn ? "/u_student" : "/"}><Logo src={`${internetIPAddress}uploads/se_white.png`} alt="SE-logo" width="150"/></a>
                    </div>
                </div>
                <div className="top-bar-right">
                    <Navbar buttonText={buttonText} buttonPath={buttonPath} theme={theme} onClick={buttonClick} menuItems={isLoggedIn ? loggedInMenuItems: menuItems}/>
                </div>
            </div>
        </header>
    );
}

export default Header;