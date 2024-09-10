import './Card.css'
import Icon from '../../icon/Icon';

function Card({card}) {

    return (
        <div className='cardContainer'>
            <div className='topIconContainer'>
                <Icon dark={card.topIcon.src} light={card.topIcon.src} alt={card.topIcon.alt} theme={card.topIcon.theme} anchor={card.topIcon.anchor} width={card.topIcon.width}/>
            </div>
            <div className='cardTextConatainer'>
                <h2>{card.title}</h2>
                <p>{card.content}</p>
            </div>
            <div className='buttomIconContainer'>
                <Icon dark={card.buttomIcon.src} light={card.buttomIcon.src} alt={card.buttomIcon.alt} theme={card.buttomIcon.theme} anchor={card.buttomIcon.anchor} width={card.buttomIcon.width}/>
            </div>

        </div>
    );
}

export default Card