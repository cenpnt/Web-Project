import { Button } from '@chakra-ui/react'
import { useLocation, useNavigate } from 'react-router-dom'
import './AcceptInvitation.css'

function AcceptInvitation() {
    const location = useLocation();
    const navigate = useNavigate();

    const acceptInvitation = async (token) => {
        console.log(token);
        try {
            const response = await fetch('http://localhost:8000/accept_invitation', {
                method: "POST",
                headers: { "Content-Type" : "application/json"},
                body: JSON.stringify({ token })
            })
            if(!response.ok) {
                const data = await response.json();
                console.error(data);
                throw new Error("Error changing staus");
            }
            const data = await response.json();
            navigate(`/coworkingspace?status=${data.status}`);
        } catch (error) {
            console.error("Error changing status from pending to accept: ", error);
        }
    }

    const handleAccept = async () => {
        const queryParam = new URLSearchParams(location.search);
        const token = queryParam.get('token');
        if(token) {
            await acceptInvitation(token);
        }

    }

    return (
        <div className='acceptContainer'>
 
            <div className='acceptedBox'>
                <img src="http://localhost:8000/uploads/selogo-dark.png" alt="se-dark-logo" />
                <h3>Accept Co-Working Reservation</h3>
                <div className='acceptButtonContainer'>
                    <Button colorScheme='green' onClick={handleAccept}>Accept</Button>
                    <Button colorScheme='red'>Reject</Button>
                </div>  
            </div>
        </div>
    );
}


export default AcceptInvitation;