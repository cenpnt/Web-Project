import React from 'react';
import Logo from '../Logo'
import Navbar from './navbar/Navbar';
import './Header.css'
import { useAuth } from '../../context/AuthContext';

function Header({ theme }) {
    const { buttonText, buttonPath, buttonClick } = useAuth();
    return (
        <header className={`header ${theme}`}>
            <div className="top-bar">
                <div className="top-bar-left">
                    <div className='logoContainer'>
                        <a href="/"><Logo src="https://www.se.kmitl.ac.th/assets/se.png" alt="SE-logo" width="150"/></a>
                    </div>
                </div>
                <div className="top-bar-right">
                    <Navbar buttonText={buttonText} buttonPath={buttonPath} theme={theme} onClick={buttonClick}/>
                </div>
            </div>
        </header>
    );
}

export default Header;