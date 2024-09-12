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
                    <Logo src={"https://scontent.xx.fbcdn.net/v/t1.15752-9/457887191_1549139246009506_4859828069241605811_n.png?_nc_cat=109&ccb=1-7&_nc_sid=0024fc&_nc_ohc=LVQAGvYcGnIQ7kNvgHiuM0f&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&_nc_gid=AKdkkkBWSsJDZtbtgQC7R9i&oh=03_Q7cD1QG3DtkLxfgifi3gHt6_kfuxOwinwnmuvekxX4dPrkSSnw&oe=670763B0"} alt="SE-logo" width="150"/>
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