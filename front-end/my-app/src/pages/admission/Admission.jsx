import Footer from "../../components/footer/Footer";
import { Fade } from "react-awesome-reveal";
import Detail from "../../components/detail/Detail";
import { arr4, arr5, arr6, arr7 } from "../../constants";
import './Admission.css'

function Admission() {
    return(
        <>
            <h1 className="application-period">Application Period</h1>
            <div className="admission-container">
                <Fade cascade damping={0.1}>
                <div className="direct-admission">
                    <h2>Direct <br />Admission<br />1.1</h2>
                    <h4>Early Round</h4>
                    <h1>Now - 11</h1>
                    <h4>Nov 2024</h4>
                    <hr />
                    <h5>Admission Quota</h5>
                    <h1 className="admissionSeat">10</h1>
                    <h5>Seats</h5>
                </div>
                <div className="tcas">
                    <h2>TCAS 1</h2>
                    <h4>Portfolio</h4>
                    <h1>1 - 20</h1>
                    <h4>Dec 2024</h4>
                    <hr />
                    <h5>Admission Quota</h5>
                    <h1 className="admissionSeat">20</h1>
                    <h5>Seats</h5>
                </div>
                <div className="direct-admission">
                    <h2>Direct <br />Admission<br />1.2</h2>
                    <h4>Early Round</h4>
                    <h1>1 - 20</h1>
                    <h4>Dec 2024</h4>
                    <hr />
                    <h5>Admission Quota</h5>
                    <h1 className="admissionSeat">5</h1>
                    <h5>Seats</h5>
                </div>
                <div className="tcas">
                    <h2>TCAS 2</h2>
                    <h4>Quota</h4>
                    <h1>1 - 15</h1>
                    <h4>Mar 2025</h4>
                    <hr />
                    <h5>Admission Quota</h5>
                    <h1 className="admissionSeat">5</h1>
                    <h5>Seats</h5>
                </div>
                <div className="tcas">
                    <h2>TCAS 3</h2>
                    <h4>Admission</h4>
                    <h1>7 - 13</h1>
                    <h4>May 2025</h4>
                    <hr />
                    <h5>Admission Quota</h5>
                    <h1 className="admissionSeat">5</h1>
                    <h5>Seats</h5>
                </div>
                </Fade>
            </div>
            <div className="application-requirements">
                <div>
                    <h1>APPLICATION REQUIREMENTS</h1>
                    <p>The application process is conducted in accordance with KMITL's guidelines, and also rules and regulations.</p>
                </div>
                <div>
                    <h2>Educational Background (Required)</h2>
                    <Detail arr={ arr4 } hideText={'- Hide Details'} showText={'+ Show Details'} theme={'requirement'}/>
                </div>

                <div>
                    <h2>Academic Record (Optional)</h2>
                    <p>The applicant <span className="boldRedText">should submit</span> at least one of the following standardized test results and obtain a score which meet the minimum requirements as specified below:</p>
                    <Detail arr={ arr5 } hideText={'- Hide Details'} showText={'+ Show Details'} theme={'requirement'}/>
                </div>

                <div>
                    <h2>Language Requirements (for non-native English speakers) (Optional)</h2>
                    <p>The applicant <span className="boldRedText">should submit</span> at least one of the following English Proficiency Test scores, meeting or exceeding the minimum requirements specified below:</p>
                    <Detail arr={ arr6 } hideText={'- Hide Details'} showText={'+ Show Details'} theme={'requirement'}/>
                </div>

                <div className="personalStatement">
                    <h2>Personal Statement (Optional)</h2>
                    <p>The applicant <span className="boldRedText">should write</span> an essay (500 words or below) that provides insight into the reasons for pursing a degree program, including long term goals, motivation, and commitment, and also demonstrates your ability to communicate your thoughts systematically.</p>
                </div>

                <div>
                    <h2>Two Recommendation Letters (Optional)</h2>
                    <p>The applicant <span className="boldRedText">should provide</span> two recommendation letters written by your high school academic advisors or teachers of any subject in high school.</p>
                </div>
            </div>
            <div className="admission-schedule">
                <h1>ADMISSIONS SCHEDULE</h1>
                <Detail arr={ arr7 } hideText={'- Hide Details'} showText={'+ Show Details'} className={"requirementDetail"} theme={"requirement"}/>
            </div>
            <div className="application-submission">
                <h1>APPLICATION SUBMISSION</h1>
                <div className="step">
                    <h2>Step 1</h2>
                    <p>Applicants must apply via KMITL online application system <a href="https://new.reg.kmitl.ac.th/admission/" target="_blank" rel="noreferrer">Admission Link</a></p>
                    <br />
                    <p>User guidance for application system: <a href="https://drive.google.com/file/d/1DHWVayEjQtMde8hHcDTYHe3XzEyNZTta/view?usp=sharing" target="_blank" rel="noreferrer">Google Drive Link</a></p>
                </div>
                
                <div className="step">
                    <h2>Step 2</h2>
                    <p>Applicants must print the payment slip and deposit a non-refundable application fee of 1,000 baht at any Kasikorn Bank (KBank) counter (with an additional 10-baht fee) or scanning the barcode via any mobile Banking application (free of charge).</p>
                    <br /><br />
                    <p>
                        <span className="boldRedText">Remark: </span>
                        The applicant is responsible for any additional transaction fees incurred by financial institutions. <strong>Please be notified that the application fee is nonrefundable</strong>. Eligibility for an interview will be informed to the applicant after the review of the application form and supporting documents is completed by the admission committees. The specific timing of the interview will be announced at a later date via the registrar website and the SIIE official Facebook page.
                    </p>
                </div>

                <div className="step">
                    <h2>Step 3</h2>
                    <p>Applicants must upload your application form and all supporting documents as specified below in one pdf file (no larger than 4MB) to the online application system.</p>
                    <ol>
                        <li>Your application form (Can be downloaded from the application system)</li>
                        <li>A photocopy of the applicant's national identification card or passport</li>
                        <li>Academic Records - High School Transcript, SAT, ACT, IB etc.</li>
                        <li>English Proficiency Test score - IELTS, TOEFL etc. (optional)</li>
                        <li>Two recommendation letters from teachers or supervisors. (optional)</li>
                        <li>Personal Statement (optional)</li>
                        <li>Portfolios (optional) (No more than 10 pages including the cover page)</li>
                        <li>Placement test results (optional): submit available AP, IB Higher Level, A-Level, or any grade 12 equivalent placement test results. The policy and criteria for placement credits will be determined prior to the applicant's enrolment.</li>
                        <li>Certificate in any academic activities provided by School of Engineering – KMITL (optional)</li>
                    </ol>
                    <p>
                        <span className="boldRedText">Remark: </span>
                        Please rename your pdf file before uploading to the application system as follows: <br />
                        1st Selected Program Name_Application ID_Firstname Lastname <br />
                        <span className="boldRedText">Software Engineering_12345_John Doe</span>
                    </p>
                </div>
            </div>
            <div className="tuition-fees">
                <h1>TUITION FEES</h1>
                <h5>90,000 THB/Semester</h5>
            </div>
            <div className="scholarships">
                <h1>SCHOLARSHIPS</h1>
                <p> Academic Excellence Freshmen Scholarships are offered to applicants with excellent academic performances to pursue their undergraduate education in the international programs, the School of Engineering at KMITL. The scholarship will be granted to 1st year students for two semesters.</p>
                <div>
                    <h2>Minimum Academic requirements are as follows:</h2>
                    <ol>
                        <li>Achieved SAT General test composite score of at least 85 world percentiles (1,300)</li>
                        <li>Achieved TOEFL score of at least 550 (paper-based) or 213 (Computer-based), or 79 (Internet-based), or IELTS score of at least 6.0.</li>
                    </ol>
                </div>
                
            </div>
            <Footer theme={'dark'}/>
        </>
    );
}

export default Admission;