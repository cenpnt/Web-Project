import './UStudent.css';
import CodeDashboardBox from '../../components/codeDashboardBox/codeDashboardBox';
import Footer from '../../components/footer/Footer';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Button from '../../components/button/Button';
import { useAuth } from '../../context/AuthContext';


function UStudent() {
    
    const [username, setUsername] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const {internetIPAddress} = useAuth();
    const pics = `${internetIPAddress}uploads/co-room3.png`

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

    const fetchUser = async () => {
        const userID = localStorage.getItem('userID');
            try {
                const response = await fetch(`${internetIPAddress}user/data/${userID}`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                  }
                const data = await response.json();
                setUsername(data.username);
              
            } catch (error) {
                console.error('Error fetching data', error);
            }
    }

    const getCurrentDate = () => {
        const date = new Date();
        const options = {year: 'numeric', month: 'long', day: 'numeric'};
        return date.toLocaleDateString(undefined, options);
    }

    useEffect(() => {
        fetchUser();
        setCurrentDate(getCurrentDate());
    }, [])

    const topic = {header: 'Array', percent: 40}
    
    return (
        <div className='ustudent-container'>
            <div className='welcomeBackContainer'>
                <div className='displayDate'>{currentDate}</div>
                <h1>Welcome back, {username}!</h1>
                <div className='displayQuote'>
                    Always stay updated in your student dashboard
                </div>
            </div>
            <div className='codeEditorSection'>
                <h3>Code Editor</h3>
                <Carousel responsive={responsive}  swipeable={true} infinite={true} itemClass="carousel-item-padding" containerClass="carousel-container">
                <div style={{ margin: '0 0px' }}>
                    <CodeDashboardBox codeTopic={topic} />
                </div>
                <div style={{ margin: '0 0px' }}>
                    <CodeDashboardBox codeTopic={topic} />
                </div>
                <div style={{ margin: '0 0px' }}>
                    <CodeDashboardBox codeTopic={topic} />
                </div>
                <div style={{ margin: '0 0px' }}>
                    <CodeDashboardBox codeTopic={topic} />
                </div>
                </Carousel>
            </div>
            <div className='coWorkingSpaceSection'>
                <h3>Co-Working Space</h3>
                <div className='coWorkingSpaceBox'>
                    <div className='coWorkingSpace1'>
                        <h4>Your Reservation</h4>
                    </div>
                    <div className='coWorkingSpace2'>
                        <img src={pics} alt="" />
                        <h4>Book Your room now!</h4>
                        <Button text={'Reserve'} path={'/coworkingspace'}/>
                    </div>
                </div>
                
            </div>
            
            <Footer theme={'dark'}/>
        </div>
    );
}

export default UStudent;