import './UStudent.css'
import Header from "../components/header/Header";
import Footer from '../components/footer/Footer';

function UStudent() {
    return (
        <div className='ustudent-container'>
            <Header buttonText={'Sign out'} buttonPath={'/'} theme={'light'} />
            <Footer theme={'light'}/>
        </div>
    );
}

export default UStudent