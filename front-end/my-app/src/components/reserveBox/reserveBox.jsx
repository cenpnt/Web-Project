import './reserveBox.css'

function ReservationBox({roomName,roomImage, onClose, amenities}){
    return (
        <div className='reservation-box'>
            <h2>{roomName} Reservation</h2>
            {roomImage && <img src={roomImage} alt={`${roomName}`} className='room-image' />}
            <h3>Amenities</h3>
            <ul className='amenities-list'>
                {amenities.map((amenity, index) => (
                <li key={index}>{amenity}</li>
                ))}
            </ul>

            <button className='close-button' onClick={onClose}><img src="https://cdn-icons-png.flaticon.com/128/1828/1828778.png" alt="close" style={{width: '20px', padding: '5px'}}/></button>
            <button className='reserve-button'>Reserve</button>
        </div>
    );

}

export default ReservationBox;