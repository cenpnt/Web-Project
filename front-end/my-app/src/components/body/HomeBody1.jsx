import React from 'react';
import './HomeBody1.css'
import AuthHeader from '../AuthHeader';
import Cards from './Cards';

function HomeBody1() {
    return (
      <AuthHeader theme="transparent">
        <div className='section1'>
          <div className='main-section1'>
            <p className='homebody1-title'>Software Engineering</p>
            <br/>
            <p className='homebody1-description'>King Mongkut's Institute of Technology Ladkrabang</p>
            <br/>
            <div className='card-container'>
              <Cards />
            </div>
          </div>
        </div>
      </AuthHeader>
    );
}

export default HomeBody1