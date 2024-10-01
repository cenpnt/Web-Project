import React from 'react';
import './Footer.css'
import Logo from '../Logo';
import Icon from '../icon/Icon';
import { useAuth } from '../../context/AuthContext';


function Footer({ theme }) {
    const {internetIPAddress} = useAuth();

    return (
        <div className={`footer-main-container ${theme}`}>
            <div className='footer-copyright'>
                <p>Copyright © 2024 Software Engineering<br/>King Mongkut's Institute of Technology Ladkrabang</p>
            </div>
            <div className='footer-logo'>
                <a href="#top">
                    <Logo src={`${internetIPAddress}uploads/se_white.png`} alt="SE-logo" width="150"/>
                </a>
            </div>
            <div className='footer-social'>
                <ul>
                    <li><Icon theme={theme} dark={"https://www.harvard.edu/wp-content/uploads/2023/11/Instagram-1.png"} light={"https://cdn-icons-png.flaticon.com/128/1384/1384031.png"} anchor={"https://www.instagram.com/kmitlofficial/"} alt={"instagram logo"} width={"80"}/></li>
                    <li><Icon theme={theme} dark={"https://www.harvard.edu/wp-content/uploads/2023/11/FB3.png"} light={"https://cdn-icons-png.flaticon.com/128/20/20837.png"} anchor={"https://www.facebook.com/kmitlofficial/?locale=th_TH"} alt={"facebookIcon"} width={"50"}/></li>
                    <li><Icon theme={theme} dark={"https://www.harvard.edu/wp-content/uploads/2023/11/youtube-1.png"} light={"https://cdn-icons-png.flaticon.com/128/1384/1384028.png"} anchor={"https://www.youtube.com/@SchoolofEngineeringKMITL"} alt={"youtubeIcon"} width={"50"}/></li>
                </ul>
            </div>
        </div>
    );
}

export default Footer