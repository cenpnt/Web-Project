import './Box.css'
import Button from '../../button/Button'
import Logo from '../../Logo'

function Box({ box }) {
    return (
        <div className='Box'>
            <div className="box-header">
                <h1>{box.head}</h1>
            </div>
            <div className="box-content">
                <div className='box-img-container'>
                    <img src={box.img} alt={box.alt} className='uni-img'/>
                </div>
                
                <div className='box-text'>
                    <div className='box-logo-container'>
                        <Logo src={box.logo.src} alt={box.logo.alt} width={box.logo.width} className="logo"/>
                    </div>
                    <div className='box-paragraph-container'>
                        <p>{box.des}</p><br/>
                    </div>
                    <Button text="See More" path='/home'/>
                </div>
            </div>
        </div>   
    );
}

export default Box