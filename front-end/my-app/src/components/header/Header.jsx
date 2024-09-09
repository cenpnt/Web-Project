import React from 'react';
import Logo from '../Logo'
import Navbar from './navbar/Navbar';
import './Header.css'
import { useAuth } from '../../context/AuthContext';

function Header({ theme }) {
    const { buttonText, buttonPath, buttonClick } = useAuth();
    const logo = theme === 'glasgow' ? 'https://media.discordapp.net/attachments/1280538997944225846/1282338015175249931/se_white.png?ex=66dfa697&is=66de5517&hm=213b2aac9e70897c93f2f7fdbc9b90839b3476b718d7cafbf3d61ba06242f3de&=&format=webp&quality=lossless&width=450&height=250': 'https://www.se.kmitl.ac.th/assets/se.png';
    return (
        <header className={`header ${theme}`}>
            <div className="top-bar">
                <div className="top-bar-left">
                    <div className='logoContainer'>
                        <a href="/"><Logo src={logo} alt="SE-logo" width="150"/></a>
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