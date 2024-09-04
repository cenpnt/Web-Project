import './App.css';
import Header from './components/header/Header'

function App() {
  return (
    <div className="App">
      <Header/>
      <div className='section1'>
        <div className='left-section'>

          <div className='circle'></div>
          <div className='lineContainer'>
            <div className='line'></div>
          </div>

        </div>
        <div className='right-section'>
          <p className='title'>Welcome to SE.</p>
          <br/>
          <p className='description'>King Mongkut's Institute of Technology Ladkrabang</p>
        </div>
      </div>
      
    </div>
  );
}

export default App;
