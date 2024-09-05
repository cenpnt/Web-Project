import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import Header from '../components/header/Header';
import HomeBody1 from '../components/body/HomeBody1'
import HomeBody2 from '../components/body/HomeBody2';
import Footer from '../components/footer/Footer';

function Home() {
    return (
        <div className="Home">
      <Header />
      <HomeBody1 />
      <div className='carousel'>
        <HomeBody2 />
      </div>
      <Footer />
    </div>
    );
}

export default Home