import Card from "./card/Card";
import "./Cards.css"

function Cards() {
  
  const card1 = {
    topIcon: {src: 'https://cdn-icons-png.flaticon.com/128/4270/4270578.png', alt: 'book', theme: 'dark', width: '50'},
    title: 'Curriculum', 
    content: 'Explore programs designed to build both knowledge and practical skills for success.',
    buttomIcon: {src: 'https://cdn-icons-png.flaticon.com/128/545/545682.png', alt: 'book', theme: 'dark', width: '20'},
  }
  
  const card2 = {
    topIcon: {src: 'https://cdn-icons-png.flaticon.com/128/3104/3104455.png', alt: 'admission', theme: 'dark', width: '50'},
    title: 'Admission', 
    content: 'Find out how to apply, meet the requirements, and join our growing community.',
    buttomIcon: {src: 'https://cdn-icons-png.flaticon.com/128/545/545682.png', alt: 'admission', theme: 'dark', width: '20'},
  }
  
  const card3 = {
    topIcon: {src: 'https://cdn-icons-png.flaticon.com/128/864/864102.png', alt: 'about', theme: 'dark', width: '50'},
    title: 'About', 
    content: 'Learn about our mission, history, and commitment to academic excellence.',
    buttomIcon: {src: 'https://cdn-icons-png.flaticon.com/128/545/545682.png', alt: 'about', theme: 'dark', width: '20'},
  }
  
  const card4 = {
    topIcon: {src: 'https://cdn-icons-png.flaticon.com/128/3037/3037825.png', alt: 'contact', theme: 'dark', width: '50'},
    title: 'Contact', 
    content: 'Get in touch with us through phone, email, or visit our campus for assistance.',
    buttomIcon: {src: 'https://cdn-icons-png.flaticon.com/128/545/545682.png', alt: 'contact', theme: 'dark', width: '20'},
  }
  

  return (
    <div className="cards-container">
      <a href="/contact"><Card card={card1}/></a>
      <a href="/contact"><Card card={card2}/></a>
      <a href="/contact"><Card card={card3}/></a>
      <a href="/contact"><Card card={card4}/></a>
    </div>
  );
}

export default Cards;
