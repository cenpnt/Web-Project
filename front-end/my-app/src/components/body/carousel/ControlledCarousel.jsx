import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './ControlledCarousel.css';

const slides = [
  {
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/45/1c/9d/university-of-glasgow.jpg?w=1200&h=1200&s=1",
    alt: "Glasgow University picture",
    title: "KMITL-Glasgow<br/> Double-Degree Program",
    description: "The KMITL-Glasgow Double-Degree Program in Software Engineering is a collaboration between KMITL and the University of Glasgow, UK. The program enables qualified students who have completed Year 2 in the SE program at the International College to enter Years 3 and 4 of the Software Engineering program at the University of Glasgow's School of Computing Science. At Glasgow, the student will have an opportunity to study with world-renowned academics, as well as working on team projects with multi-national talents. This is an excellent opportunity for the students who wish to gain studying and living experience in the UK."
  },
  {
    image: "https://uq.edu.au/sites/default/files/styles/uqds_card/public/2023-12/st-lucia-campus.jpg?itok=39nkzdMY",
    alt: "Queensland Univeristy picture",
    title: "KMITL-Queensland<br/> Double-Degree Program",
    description: "The KMITL-Queensland Double-Degree Program in Software Engineering is a collaboration between KMITL and the University of Queensland (UQ), Australia. The program enables qualified students who have completed Year 2 in the Software Engineering program at KMITL to enter Years 3 and 4 of the Software Engineering program at the University of Queensland in Australia, and, upon completion, be awarded with software engineering degrees from both KMITL and UQ. The collaborative program aims to equip its students with advanced knowledge and skills of software engineering to prepare them for careers in the international software industry, as well as for research and postgraduate study in all computing-related fields."
  },
];

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="carousel-container">
      <Carousel activeIndex={index} onSelect={handleSelect} className="custom-carousel">
        {slides.map((slide, idx) => (
          <Carousel.Item key={idx}>
            <div className="carousel-content">
              <div className="carousel-image-container">
                <img 
                  src={slide.image} 
                  alt={slide.alt} 
                />
              </div>
              <div className="carousel-description">
                <h3 dangerouslySetInnerHTML={{ __html: slide.title }} />
                <p>{slide.description}</p>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default ControlledCarousel;