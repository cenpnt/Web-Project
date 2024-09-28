import { Button } from '@chakra-ui/react'

function AcceptInvitation() {

    return (
        <div>
            <div className='acceptedBox'>
                <h3>Accept Co-Working Reservation</h3>
                <div style={{display: 'flex', }}>
                    <Button colorScheme='green'>Accept</Button>
                    <Button colorScheme='red'>Reject</Button>
                </div>
            </div>
        </div>
    );
}


export default Accept;