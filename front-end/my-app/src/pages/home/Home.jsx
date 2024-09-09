import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import HomeBody1 from '../../components/body/HomeBody1'
import HomeBody2 from '../../components/body/HomeBody2';
import HomeBody3 from '../../components/body/HomeBody3';
import Footer from '../../components/footer/Footer';
import HomeBody1Section2 from '../../components/body/HomeBody1Section2';

function Home() {
    return (
        <div className="Home">
          <HomeBody1 />
          <HomeBody1Section2/>
          <div className='carousel'>
            <HomeBody2 />
          </div>
          <HomeBody3 />
          <Footer theme={'dark'}/>
        </div>
    );
}

export default Home