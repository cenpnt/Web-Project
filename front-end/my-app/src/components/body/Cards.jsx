import Card from "./card/Card";
import "./Cards.css"

function Cards() {
  const card1 = {
    topIcon: {src: 'https://cdn-icons-png.flaticon.com/128/3104/3104455.png', alt: 'book', theme: 'dark', width: '50'},
    title: 'Software-Engineering 2024', 
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio autem commodi non incidunt, earum accusamus, aperiam, sint recusandae asperiores cum perspiciatis voluptas sunt ipsum! Fugit nostrum quas omnis accusamus repellendus.',
    buttomIcon: {src: 'https://cdn-icons-png.flaticon.com/128/3104/3104455.png', alt: 'book', theme: 'dark', width: '20'},
  }

  return (
    <div className="cards-container">
      <Card card={card1}/>
      <Card card={card1}/>
      <Card card={card1}/>
      <Card card={card1}/>
    </div>
  );
}

export default Cards;
