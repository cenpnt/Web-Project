import './Contact.css'
import Icon from '../../components/icon/Icon'
import Footer from '../../components/footer/Footer';
import React from 'react';


function Contact() {
  return (
    <div className='contactContainer'>
        <div className="mapContainer">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.810927024413!2d100.77565737589488!3d13.729894097798747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d664988a1bedf%3A0xcc678f180e221cd0!2z4Liq4LiW4Liy4Lia4Lix4LiZ4LmA4LiX4LiE4LmC4LiZ4LmC4Lil4Lii4Li14Lie4Lij4Liw4LiI4Lit4Lih4LmA4LiB4Lil4LmJ4Liy4LmA4LiI4LmJ4Liy4LiE4Li44LiT4LiX4Lir4Liy4Lij4Lil4Liy4LiU4LiB4Lij4Liw4Lia4Lix4LiH!5e0!3m2!1sth!2sth!4v1725982780734!5m2!1sth!2sth"
                width="800"
                height="450"
                style={{border: "1", borderRadius: "20px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)"}}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="Google Maps location of university"
            ></iframe>
            <div className='contact-details'>
                <h5>Contact Us</h5>
                <h1>Faculty of Engineering</h1>
                <h5>King Mongkut's Institute of Technology Ladkrabang</h5>
                <div className='contact-tel'>
                    <Icon dark={'https://cdn-icons-png.flaticon.com/128/25/25453.png'} light={'https://cdn-icons-png.flaticon.com/128/25/25453.png'} theme={'light'} alt={'phone'} width={'25'}/>
                    <a href="tel:+669 3474 7468"><p>+66 93 474 7468</p></a>
                </div>
                <div className='contact-tel'>
                    <Icon dark={'https://cdn-icons-png.flaticon.com/128/25/25453.png'} light={'https://cdn-icons-png.flaticon.com/128/25/25453.png'} theme={'light'} alt={'phone'} width={'25'}/>
                    <a href="tel:+66 80 454 9990"><p>+66 80 454 9990</p></a>
                </div>
                <div className='contact-tel'>
                    <Icon dark={'https://cdn-icons-png.flaticon.com/128/542/542689.png'} light={'https://cdn-icons-png.flaticon.com/128/542/542689.png'} theme={'light'} alt={'mail'} width={'25'}></Icon>
                    <a href="mailto:siie@kmitl.ac.th"><p>siie@kmitl.ac.th</p></a>
                </div>
                <div className='contact-tel'>
                    <Icon dark={'https://cdn-icons-png.flaticon.com/128/542/542689.png'} light={'https://cdn-icons-png.flaticon.com/128/542/542689.png'} theme={'light'} alt={'mail'} width={'25'}></Icon>
                    <a href="mailto:siie-admission@kmitl.ac.th"><p>siie-admission@kmitl.ac.th</p></a>
                </div>
                <div className='contact-tel'>
                    <Icon dark={'https://cdn-icons-png.flaticon.com/128/542/542689.png'} light={'https://cdn-icons-png.flaticon.com/128/542/542689.png'} theme={'light'} alt={'mail'} width={'25'}></Icon>
                    <a href="mailto:natthapong.ju@kmitl.ac.th"><p>natthapong.ju@kmitl.ac.th</p></a>
                </div>
                <div className='contact-tel'>
                    <Icon dark={'https://cdn-icons-png.flaticon.com/128/542/542689.png'} light={'https://cdn-icons-png.flaticon.com/128/542/542689.png'} theme={'light'} alt={'mail'} width={'25'}></Icon>
                    <a href="mailto:visit.hi@kmitl.ac.th"><p>visit.hi@kmitl.ac.th</p></a>
                </div>
                <div className='contact-tel'>
                    <Icon dark={'https://cdn-icons-png.flaticon.com/128/1231/1231223.png'} light={'https://cdn-icons-png.flaticon.com/128/1231/1231223.png'} theme={'light'} alt={'mail'} width={'25'}></Icon>
                    <a href="https://engineer.kmitl.ac.th/" target='_blank' rel='noreferrer'><p>https://engineer.kmitl.ac.th/</p></a>
                </div>
        </div>
        </div>
        
        <Footer theme={'dark'}/>
    </div>
  );
}

export default Contact;
