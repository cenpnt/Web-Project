import { Button } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import './AcceptInvitation.css'

function AcceptInvitation() {
    const [isAccept, setIsAccept] = useState(false);
    const [isChose, setIsChose] = useState(false);
    const location = useLocation();

    const acceptInvitation = async (token, acceptStatus) => {
        try {
            const response = await fetch('http://localhost:8000/accept_invitation', {
                method: "PUT",
                headers: { "Content-Type" : "application/json"},
                body: JSON.stringify({ token, isAccept: acceptStatus })
            })
            if(!response.ok) {
                throw new Error("Error changing staus");
            }
        } catch (error) {
            console.error("Error changing status from pending to accept: ", error);
        }
    }

    const handleAccept = async () => {
        const queryParam = new URLSearchParams(location.search);
        const token = queryParam.get('token');
        if(token) {
            await acceptInvitation(token, true);
            setIsAccept(true);
            setIsChose(true);
        }
    }

    const handleDecline = async () => {
        const queryParam = new URLSearchParams(location.search);
        const token = queryParam.get('token');
        if(token) {
            await acceptInvitation(token, false);
            setIsAccept(false);
            setIsChose(true);
        }
    }

    return (
        <div className='acceptContainer'>
            <div className='acceptedBox'>
                <img src="http://localhost:8000/uploads/selogo-dark.png" alt="se-dark-logo" />
                {!isChose ? 
                <>
                <h3>Invitation to Join a Coworking Space</h3>
                <h5>Would you like to accept this invitation?</h5>
                <div className='acceptButtonContainer'>
                    <Button colorScheme='green' onClick={handleAccept}>Accept</Button>
                    <Button colorScheme='red' onClick={handleDecline}>Decline</Button>
                </div>  
                </> 
                : 
                <>
                    { isAccept ?
                    <>
                    <h3>Invitation Accepted!</h3>
                    </> :
                    <h3>Invitation Decline</h3>
                    }
                </>}
                
            </div>
        </div>
    );
}


export default AcceptInvitation;