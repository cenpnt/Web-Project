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
          <br/>
          <div className='bulletPointerContainer'>
            <p className='bulletPoint2'>Software engineering (SE) is an engineering discipline concerning all aspects of software production, including software analysis, design, development, testing, and deployment. SE requires profound abstract and logical thinking and the application of mathematics, logic, and computer science in order to produce efficient and reliable software with the available resources.</p>
          </div>
        </div>
      </div>
    );
}

export default Body