import './Box.css'
import Button from '../../button/Button'
import Logo from '../../Logo'

function Box({box}) {
    return (
        <div className='Box'>
            <div className="header">
                <h1>{box.head}</h1>
            </div>
            <div className="content">
                <div className='imgcontainer'>
                    <img src={box.img} alt={box.alt} className='uni-img'/>
                </div>
                
                <div className='text'>
                    <div className='logoContainer'>
                        <Logo src={box.logo.src} alt={box.logo.alt} width={box.logo.width} className="logo"/>
                    </div>
                    <div className='paraContainer'>
                        <p>{box.des}</p><br/>
                    </div>
                    <Button text="See More" path='/home'/>
                </div>
            </div>
        </div>   
    );
}

export default Box