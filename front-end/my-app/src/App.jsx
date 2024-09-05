import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/header/Header'
import HomeBody1 from './components/body/HomeBody1'
import HomeBody2 from './components/body/HomeBody2';
import Footer from './components/footer/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <HomeBody1 />
      <div className='carousel'>
        <HomeBody2 />
      </div>
      <Footer />
    </div>
  );
}

export default App;
