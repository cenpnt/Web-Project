import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import Header from '../components/header/Header';
import HomeBody1 from '../components/body/HomeBody1'
import HomeBody2 from '../components/body/HomeBody2';
import HomeBody3 from '../components/body/HomeBody3';
import Footer from '../components/footer/Footer';

function Home() {
    return (
        <div className="Home">
      <Header />
      <HomeBody1 />
      <div className='carousel'>
        <HomeBody2 />
      </div>
      <HomeBody3 />
      <Footer />
    </div>
    );
}

export default Home