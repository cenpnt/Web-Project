import React from 'react';
import ControlledCarousel from './carousel/ControlledCarousel'
import './HomeBody2.css'
import { Fade } from "react-awesome-reveal";
import { HomeBody2Slides } from '../../constants';

function HomeBody2() {
      
    return (
        
        <div className='carousel'>
          <Fade cascade damping={0.3}>
            <div className='carousel-header'>
              <h1>EVENTS</h1>
            </div>
            <ControlledCarousel slides={HomeBody2Slides} theme={'dark'}/>
          </Fade>
          
        </div>
    );
}

export default HomeBody2