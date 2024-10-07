import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box
} from '@chakra-ui/react'

function CourseDetail({ details }) {
    return (
        <Accordion allowToggle width={'103%'} mt={5}>
            {details.map((detail, index) => (
                <AccordionItem key={index}>
                    <h2>
                        <AccordionButton display={'flex'} justifyContent={'space-between'}>
                            <Box textAlign={'left'}>
                                { detail.content.track && <Box style={{color : "orange", display: "block"}}>{detail.content.track}</Box>}
                                <Box>{detail.title}</Box>
                            </Box>
                            <AccordionIcon />   
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <Box><strong>Prerequisite</strong> : {detail.content.prerequisite}</Box>
                        <Box><strong>Program</strong> : {detail.content.program}</Box>
                        <Box><strong>Subject credit</strong> : {detail.content.credit}</Box>
                        <br />
                        <Box><strong>Description</strong> : {detail.content.description}</Box>
                    </AccordionPanel>
                </AccordionItem>
            ))}
        </Accordion>
    );
}

export default CourseDetail;
