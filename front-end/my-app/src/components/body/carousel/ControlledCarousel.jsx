import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './ControlledCarousel.css';

function ControlledCarousel({ slides, theme }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  
  return (
    <div className={`carousel-container ${theme}`}>
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