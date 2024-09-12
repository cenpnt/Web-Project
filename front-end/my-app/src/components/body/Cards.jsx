import Card from "./card/Card";
import "./Cards.css"
import React from 'react';
import { Fade } from "react-awesome-reveal";
import { card1, card2, card3, card4 } from "../../constants";

function Cards() {
  
  return (
    <div className="cards-container">
      <Fade cascade damping={0.1}>
        <a href="/contact"><Card card={card1}/></a>
        <a href="/contact"><Card card={card2}/></a>
        <a href="/contact"><Card card={card3}/></a>
        <a href="/contact"><Card card={card4}/></a>
      </Fade>
    </div>
  );
}

export default Cards;
