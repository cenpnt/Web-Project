import React from 'react';
import Box from './box/Box';

function HomeBody3(){

    const box1={
        head: "KMTIL - GLASGOW",
        img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/45/1c/9d/university-of-glasgow.jpg?w=1200&h=1200&s=1",
        alt: "picture of glassgow university",
        des: "The KMITL-Glasgow Double-Degree Program in Software Engineering is a collaboration between KMITL and the University of Glasgow, UK. The program enables qualified students who have completed Year 2 in the SE program at the International College to enter Years 3 and 4 of the Software Engineering program at the University of Glasgow's School of Computing Science. At Glasgow, the student will have an opportunity to study with world-renowned academics, as well as working on team projects with multi-national talents. This is an excellent opportunity for the students who wish to gain studying and living experience in the UK.",
        logo: {
            src: "https://historicalthesaurus.arts.gla.ac.uk/graphics/UoG_white.png",
            alt: "Glasgow_logo" ,
            width: 250,
        }
    }

    const box2={
        head: "KMTIL - QUEENSLAND",
        img: "https://www.uq.edu.au/sites/default/files/styles/uqds_card/public/2023-12/st-lucia-campus.jpg?itok=39nkzdMY",
        alt: "picture of glassgow university",
        des: "The KMITL-Queensland Double-Degree Program in Software Engineering is a collaboration between KMITL and the University of Queensland (UQ), Australia. The program enables qualified students who have completed Year 2 in the Software Engineering program at KMITL to enter Years 3 and 4 of the Software Engineering program at the University of Queensland in Australia, and, upon completion, be awarded with software engineering degrees from both KMITL and UQ. The collaborative program aims to equip its students with advanced knowledge and skills of software engineering to prepare them for careers in the international software industry, as well as for research and postgraduate study in all computing-related fields.Previous",
        logo: {
            src: "https://media.discordapp.net/attachments/1280538997944225846/1281298923629314109/UQ-post-white2.png?ex=66db361c&is=66d9e49c&hm=dc9e1855caa2531d2cef2f425e687c283f399412b5625ec4e6bead6617fd5b8f&=&format=webp&quality=lossless&width=567&height=207",
            alt: "Queensland_logo" ,
            width: 300,
        }
    }

    return (
        <div>
            <Box box={box1}/>
            <Box box={box2}/>
        </div>
    );
}

export default HomeBody3