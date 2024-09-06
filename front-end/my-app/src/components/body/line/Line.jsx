import React from 'react';
import './Line.css'

function Line({ isEven }) {
    return (
        <div className='lineContainer'>
            <div className={`line ${isEven ? 'even' : 'odd'}`} />
        </div>
    );
}

export default Line