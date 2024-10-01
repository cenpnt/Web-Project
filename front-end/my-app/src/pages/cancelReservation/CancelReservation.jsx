import { Button } from '@chakra-ui/react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom'
import './CancelReservation.css';

function CancelReservation() {
    const [isCancel, setIsCancel] = useState(false);
    const location = useLocation();

    const cancelReservation = async (room_id, date, time) => {
        try {
            const response = await fetch('http://localhost:8000/cancel_reservation', {
                method: "DELETE",
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify({
                    room_id,
                    date,
                    time
                })
            })
            if(!response.ok) {
                throw new Error("Error canceling reservation");
            }
        } catch (error) {
            console.error("Error canceling reservation: ", error);
        }
    }

    const handleCancel = async () => {
        const queryParam = new URLSearchParams(location.search);
        const room_id = queryParam.get('room_id');
        const date = queryParam.get('date');
        const time = queryParam.get('time');
        if(room_id && date && time) {
            await cancelReservation(room_id, date, time);
            setIsCancel(true)
        }
    }

    return (
        <div className='cancelContainer'>
            <div className='cancelBox'>
                <img src="http://localhost:8000/uploads/selogo-dark.png" alt="se-dark-logo" />
                {!isCancel ? 
                <>
                    <h3>Cancel Reservation</h3>
                    <div className='cancelButtonContainer'>
                        <Button colorScheme='red' onClick={handleCancel}>Cancel</Button>
                    </div>  
                </> 
                : 
                <>
                    <h3>Reservation Canceled</h3>  
                </>}
            </div>
        </div>
    );
}

export default CancelReservation;