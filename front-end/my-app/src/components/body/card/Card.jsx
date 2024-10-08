import React from 'react';
import Icon from '../../icon/Icon';
import './Card.css';

function Card({card}) {
  return (
    <div className='cardContainer'>
      <div className='topIconContainer'>
        <Icon 
          dark={card.topIcon.src} 
          light={card.topIcon.src} 
          alt={card.topIcon.alt} 
          theme={card.topIcon.theme} 
          anchor={card.topIcon.anchor} 
          width={card.topIcon.width}
        />
      </div>
      <div className='cardContent'>
        <div className='cardTextContainer'>
          <h2>{card.title}</h2>
          <div className='cardDescription'>{card.content}</div>
        </div>
        <div className='buttomIconContainer'>
          <Icon 
            dark={card.buttomIcon.src} 
            light={card.buttomIcon.src} 
            alt={card.buttomIcon.alt} 
            theme={card.buttomIcon.theme} 
            anchor={card.buttomIcon.anchor} 
            width={card.buttomIcon.width}
          />
        </div>
      </div>
    </div>
  );
}

export default Card;
