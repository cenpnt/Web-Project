import React from 'react';

function Icon({ theme, dark, light ,anchor, alt, width }) {
    const link = theme === 'dark' ? dark : light;
    return(
        <li>
            <a href={anchor} target='_blank' rel='noreferrer'>
                <img src={link} alt={alt} width={width} />
            </a>
        </li>
    ); 
}

export default Icon