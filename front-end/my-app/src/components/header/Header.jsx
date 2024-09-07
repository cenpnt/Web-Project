import React from 'react';
import Logo from '../Logo'
import Navbar from './navbar/Navbar';
import './Header.css'

function Header({ buttonText, buttonPath, theme, onClick }) {
    return (
        <header className={`header ${theme}`}>
            <div className="top-bar">
                <div className="top-bar-left">
                    <div className='logoContainer'>
                        <a href="/"><Logo src="https://www.se.kmitl.ac.th/assets/se.png" alt="SE-logo" width="150"/></a>
                    </div>
                </div>
                <div className="top-bar-right">
                    <Navbar buttonText={buttonText} buttonPath={buttonPath} theme={theme} onClick={onClick}/>
                </div>
            </div>
        </header>
    );
}

export default Header;