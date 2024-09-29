import { Button } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import './AcceptInvitation.css'

function AcceptInvitation() {
    const [isAccept, setIsAccept] = useState(false);
    const location = useLocation();

    const acceptInvitation = async (token) => {
        console.log(token);
        try {
            const response = await fetch('http://localhost:8000/accept_invitation', {
                method: "POST",
                headers: { "Content-Type" : "application/json"},
                body: JSON.stringify({ token })
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
            await acceptInvitation(token);
            setIsAccept(true);
        }
    }

    return (
        <div className='acceptContainer'>
            <div className='acceptedBox'>
                <img src="http://localhost:8000/uploads/selogo-dark.png" alt="se-dark-logo" />
                {!isAccept ? 
                <>
                <h3>Invitation to Join a Coworking Space</h3>
                <h5>Would you like to accept this invitation?</h5>
                <div className='acceptButtonContainer'>
                    <Button colorScheme='green' onClick={handleAccept}>Accept</Button>
                    <Button colorScheme='red'>Reject</Button>
                </div>  
                </> 
                : 
                <>
                    <h3>Invitation Accepted!</h3>
                </>}
                
            </div>
        </div>
    );
}


export default AcceptInvitation;