import './About.css'
import { Fade } from "react-awesome-reveal";
import Footer from '../../components/footer/Footer';

export default function About() {
    return (
        <>
            <div className="container">
                <Fade cascade damping={0.01}>
                    <div className="paragraph-container">
                        <h2>What is Software Engineering?</h2>
                        <p>Software engineering (SE) is an engineering discipline concerning all aspects of software production, including software analysis, design, development, testing, and deployment. SE requires profound abstract and logical thinking and the application of mathematics, logic, and computer science in order to produce efficient and reliable software with the available resources.</p>
                    </div>
                    <div className="paragraph-container">
                        <h2>Why study Software Engineering?</h2>
                        <p>It is hard to overstate the ubiquity of software nowadays. Every computer system is governed by software. Almost every human activity involves software in some form. Undoubtedly software industry is one of the largest and fastest growing industries in the world. Consequently, skilled software engineers are in high demand worldwide. As software becomes more and more complex, the programming skills and the rudimentary knowledge of software engineering that students obtained from traditional computer science and computer engineering curriculums are insufficient. The development of real-world software applications requires the skills in analysing the problem domain and the customer's requirement and the skills in designing the software from the topmost level down to the implementation level. Moreover, a software engineer must be able to use proper tools, techniques, and methodologies in order to produce the software in an efficient manner.</p>
                    </div>
                    <div className='paragraph-container'>
                        <h2>Why Choose the International Program B.Eng. Software Engineering <br />(International Program) Course at <span>KMITL ?</span></h2>
                        <p>
                        The program aims at training the students to become skilled software engineers capable of working confidently in the international software industry. The program also provides solid computer science foundations so that the students can pursue graduate study in other computing-related fields. The program offers 3 specializations: Enterprise SE, Internet of Things, and Intelligent Systems, and collaborates with the University of Glasgow (UK) to offer a double-degree study option.

                        The KMITL-Glasgow Double-Degree Program in Software Engineering is a collaboration between KMITL and the University of Glasgow, UK. The program enables qualified students who have completed Year 2 in the SE program at the International College to enter Years 3 and 4 of the Software Engineering program at the University of Glasgow’s School of Computing Science. At Glasgow, the student will have an opportunity to study with world-renowned academics, as well as working on team projects with multi-national talents. This is an excellent opportunity for the students who wish to gain studying and living experience in the UK.</p>
                        
                    </div>
                    <div className="paragraph-container">
                        <h2>Careers in Software Engineering</h2>
                        <p>There are abundant career opportunities for graduates from the software engineering program.</p>
                        <ul>
                            <li>Software engineers, software architects, and software developers on various platforms, including enterprise software, web applications, mobile applications, games, embedded applications, etc.</li>
                            <li>Analysts and designers of IT systems, IT consultants</li>
                            <li>Software entrepreneurs With strong foundation in computer science, mathematics, and software engineering principles, graduates of the SE program may continue their studies at postgraduate level in various software engineering or computing related fields in universities worldwide.</li>
                        </ul>
                    </div>

                </Fade>
  
            </div>
            <Footer theme={'dark'}/>
        </>
    );
}