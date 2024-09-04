import './Body.css'
import Circle from '../circle/Circle';
import Line from '../line/Line';

function Body() {
    return (
        <div className='section1'>
        <div className='left-section1'>
          <Circle/>
          <Line isEven={false}/>
          <Circle/>
          <Line isEven={true}/>
        </div>
        <div className='right-section1'>
          <p className='title'>Welcome to SE.</p>
          <br/>
          <p className='description'>King Mongkut's Institute of Technology Ladkrabang</p>
        </div>
      </div>
    );
}

export default Body