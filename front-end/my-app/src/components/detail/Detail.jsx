import React, { useState } from 'react';
import DetailContent from '../detailContent/DetailContent';
import './Detail.css';

function Detail({ arr, hideText, showText, theme }) {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div className={`detail-container `}>
            <button onClick={() => setShowDetails(prevState => !prevState)} className={`course-button  ${theme != null ? theme : 'default'}`}>
                {showDetails ? hideText : showText}
            </button>
            <DetailContent arr={arr} showDetails={showDetails}/>
        </div>
    );
}

export default Detail;
