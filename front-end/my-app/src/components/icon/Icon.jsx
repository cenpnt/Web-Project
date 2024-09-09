import React from 'react';

function Icon({ theme, dark, light, anchor, alt, width }) {
    let link;
    if(theme === 'dark'){
        link = dark;
    } else if(theme === 'light') {
        link = light;
    } else if(theme === 'glasgow') {
        link = dark;
    }
    
    return(
        <li>
            <a href={anchor} target='_blank' rel='noreferrer'>
                <img src={link} alt={alt} width={width} />
            </a>
        </li>
    ); 
}

export default Icon