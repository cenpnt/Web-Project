import React from 'react';
import Logo from '../Logo'
import Navbar from './navbar/Navbar';
import './Header.css'
import { useAuth } from '../../context/AuthContext';

function Header({ theme }) {
    const { buttonText, buttonPath, buttonClick } = useAuth();

    return (
        <header className={`header ${theme}`}>
            {}
            <div className="top-bar">
                <div className="top-bar-left">
                    <div className='logoContainer'>
                        <a href="/"><Logo src={"https://scontent.xx.fbcdn.net/v/t1.15752-9/457887191_1549139246009506_4859828069241605811_n.png?_nc_cat=109&ccb=1-7&_nc_sid=0024fc&_nc_ohc=LVQAGvYcGnIQ7kNvgHiuM0f&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&_nc_gid=AKdkkkBWSsJDZtbtgQC7R9i&oh=03_Q7cD1QG3DtkLxfgifi3gHt6_kfuxOwinwnmuvekxX4dPrkSSnw&oe=670763B0"} alt="SE-logo" width="150"/></a>
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