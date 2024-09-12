import React from 'react';
import ControlledCarousel from './carousel/ControlledCarousel'
import './HomeBody2.css'
import { Fade } from "react-awesome-reveal";

function HomeBody2() {

    const slides = [
        {
          image: "https://scontent.fbkk12-3.fna.fbcdn.net/v/t39.30808-6/452136780_122156183210113552_6127710143014766341_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=f727a1&_nc_ohc=oo9HtcAIW6YQ7kNvgGDm3Ii&_nc_ht=scontent.fbkk12-3.fna&oh=00_AYAgZC2gppuvJklaePQDwaDdxQDQysRzdsm-q0Zi-fW3hQ&oe=66E63D4C",
          alt: "AI Hackathon",
          title: 'INTERNATIONAL AI HACKATHON 2024 <br/>SAVING THE WORLD WITH AI',
          description: "KMITL, The University of Queensland, and our sponsors are organizing this international hackathon to give you an opportunity to make the world a better place.Challenge your team to win a gold, silver or bronze prize for your efforts."
        },
        {
          image: "https://oztrekk.com/wp-content/uploads/2018/12/queensland_campus.jpg",
          alt: "Queensland Univeristy picture",
          title: "KMITL - U. of Queensland",
          description: "Introducing KMITL - U. of Queensland Double-Degree Program in Software Engineering Invitation to join the talk on Friday 8 December 2023, 13.30 – 14.30, Room HM-206, HM Building, School of Engineering, KMITL Limited seats. Registration required: https://bit.ly/3R2xNrY"
        },
        {
          image: "https://scontent.fbkk9-2.fna.fbcdn.net/v/t39.30808-6/452160181_122156183480113552_8005584317376542048_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=f727a1&_nc_ohc=8zBqRYVVfhkQ7kNvgG0w4cw&_nc_ht=scontent.fbkk9-2.fna&_nc_gid=ADQ8qEvpNQMXnfLmgQE-kS2&oh=00_AYCyaXRdf7Gb5kYUy51TcGivANb3Iz4FWKSh-0WeguITjg&oe=66E652F1",
          alt: "INTERNATIONAL AI HACKATHON 2024 <br/>SAVING THE WORLD WITH AI",
          title: "INTERNATIONAL AI HACKATHON 2024 <br/>SAVING THE WORLD WITH AI",
          description: "KMITL, The University of Queensland, and our sponsors are organizing this international hackathon to give you an opportunity to make the world a better place.Challenge your team to win a gold, silver or bronze prize for your efforts."
        }
      ];
      
    return (
        
        <div className='carousel'>
          <Fade cascade damping={0.3}>
            <div className='carousel-header'>
              <h1>EVENTS</h1>
            </div>
            <ControlledCarousel slides={slides} theme={'dark'}/>
          </Fade>
          
        </div>
    );
}

export default HomeBody2