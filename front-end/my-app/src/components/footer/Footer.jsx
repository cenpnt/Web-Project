import React from 'react';
import './Footer.css'
import Logo from '../Logo';

function Footer(theme) {
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
                    <li>
                        <a href="https://www.instagram.com/kmitlofficial/" target='_blank' rel='noreferrer'>
                            <img src="https://www.harvard.edu/wp-content/uploads/2023/11/Instagram-1.png" alt="instagramLogo" />
                        </a>
                    </li>
                    <li>
                        <a href="https://www.facebook.com/kmitlofficial/?locale=th_TH" target='_blank' rel='noreferrer'>
                            <img src="https://www.harvard.edu/wp-content/uploads/2023/11/FB3.png" alt="facebookIcon" />
                        </a>
                    </li>
                    <li>
                        <a href="https://www.youtube.com/@SchoolofEngineeringKMITL" target='_blank' rel='noreferrer'>
                            <img src="https://www.harvard.edu/wp-content/uploads/2023/11/youtube-1.png" alt="youtubeIcon" />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Footer