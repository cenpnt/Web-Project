import React from 'react';
import './DetailContent.css'

const DetailContent = ({ arr, showDetails }) => {
    return (
        <div className={`course-details ${showDetails ? 'show' : ''}`}>
            {arr.map((arr, index) => (
                <div key={index}>
                    <h2>{arr.header}</h2>
                    <p>{arr.description}</p>
                    {arr.coreCourses && (
                        <>
                            <ul>
                                {arr.coreCourses.map((course, index) => (
                                    <li key={index}>{course}</li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};


export default DetailContent
