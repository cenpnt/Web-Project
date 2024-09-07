import React from 'react';
import './Footer.css'
import Logo from '../Logo';
import Icon from '../icon/Icon';

function Footer({ theme }) {
    return (
        <div className={`footer-main-container ${theme}`}>
            <div className='footer-copyright'>
                <p>Copyright © 2024 Software Engineering<br/>King Mongkut's Institute of Technology Ladkrabang</p>
            </div>
            <div className='footer-logo'>
                <a href="#top">
                    <Logo src="https://www.se.kmitl.ac.th/assets/se.png" alt="SE-logo" width="150"/>
                </a>
            </div>
            <div className='footer-social'>
                <ul>
                    <Icon theme={theme} dark={"https://www.harvard.edu/wp-content/uploads/2023/11/Instagram-1.png"} light={"https://cdn-icons-png.flaticon.com/128/1384/1384031.png"} anchor={"https://www.instagram.com/kmitlofficial/"} alt={"instagram logo"} width={"80"}/>
                    <Icon theme={theme} dark={"https://www.harvard.edu/wp-content/uploads/2023/11/FB3.png"} light={"https://cdn-icons-png.flaticon.com/128/20/20837.png"} anchor={"https://www.facebook.com/kmitlofficial/?locale=th_TH"} alt={"facebookIcon"} width={"50"}/>
                    <Icon theme={theme} dark={"https://www.harvard.edu/wp-content/uploads/2023/11/youtube-1.png"} light={"https://cdn-icons-png.flaticon.com/128/1384/1384028.png"} anchor={"https://www.youtube.com/@SchoolofEngineeringKMITL"} alt={"youtubeIcon"} width={"50"}/>
                </ul>
            </div>
        </div>
    );
}

export default Footer