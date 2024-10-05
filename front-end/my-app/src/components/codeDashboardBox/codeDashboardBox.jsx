import './codeDashboardBox.css';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react';
import Button from '../button/Button';

function CodeDashboardBox({codeTopic}) {
    return(
        <Card width='230px'>
            <CardHeader>
                <h4 className='codeBoxHeader'>{codeTopic.header}</h4>
                <h4>{codeTopic.solved}/{codeTopic.all}</h4>
            </CardHeader>
            <CardBody className='cardBody'>
                <CircularProgress value={codeTopic.percent} color='green.400' size='150px'>
                    <CircularProgressLabel fontSize='25px'>{codeTopic.percent}%</CircularProgressLabel>
                </CircularProgress>
            </CardBody>
            <CardFooter>
                <div className='continueButtonContainer'>
                    <Button text={'Continue'} className={'continueButton'}/>
                </div>
            </CardFooter>
        </Card>
    );
}

export default CodeDashboardBox;