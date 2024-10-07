import './Curriculum.css'
import Footer from "../../components/footer/Footer";
import { year1Semester1, year1Semester2, year2Semester1, year2Semester2, year4Semester1, year4Semester2, year3Semester1, year3Semester2 } from "../../constants";
import CourseDetail from "../../components/courseDetail/CourseDetail";

function Curriculum() {
    return (
        <>
            <div className="curriculumContainer">
                <div className="program-overview">
                    <h1>B.Eng. in Software Engineering Program</h1>
                    <p>The B.Eng. in Software Engineering Program is a 4-year undergraduate program aiming at producing graduates who are capable of working confidently in the international software industry as well as pursuing postgraduate study and research in leading universities worldwide. The curriculum of the program is designed in accordance with the recent ACM/IEEE guideline for undergraduate curriculum in software engineering.</p>
                </div>
                <div className="curriculum-overview">
                    <h2>Curriculum Overview</h2>
                    <div className="curriculumYears">
                        <h2>Year 1 and Year 2</h2>
                        <p>In the first two years, the students will study basic courses in mathematics, computer science, and software engineering and develop their programming skills using various programming languages (including Python, C, C++, Java, etc.). Also, the students will be trained to communicate correctly and effectively. At the end of Year 2, every student is required to undertake an internship in a software company for 8 - 10 weeks. All the courses in the first two years will be held at the International College in the Bangkok Campus of KMITL.</p>
                    </div>
                    <div className="curriculumYears">
                        <h2>Year 3 and Year 4 (KMITL)</h2>
                        <p>In Year 3 and Year 4, the students will learn advanced topics in software engineering and important software development methodologies that are used in practice. The students will have opportunities to the apply the knowledge and skills they have acquired to conduct a team software project in Year 3 and a one-year research project in Year 4. Students entering Year 3 are required to take one of the following specializations:</p>
                        <ol>
                            <li>Metaverse Software Engineering - Specializing inlarge and complex software for enterprises and digital transformation.</li>
                            <li>Industrial Internet of Things - Specializing in the Internet of Things, including embedded and mobile systems.</li>
                            <li>Artificial Intelligence - Specializing in applications of artificial intelligence and data science, including machine learning and Big Data.
                                The study plans for these three specializations differ in some required courses. Also the students are recommended to toe work on their senior projects that utilize the knowledge of their respective specializations.</li>
                        </ol>
                    </div>
                    <div className="curriculumYears">
                        <h2>Year 3 and Year 4 (KMITL-Glasgow Double-Degree Program)</h2>
                        <p>
                        The students joining the KMITL-Glasgow Double-Degree Program will take courses in Years 3 and 4 in the Software Engineering program at the School of Computing Science, University of Glasgow.</p>
                    </div>
                    <div className="curriculumYears">
                        <h2>Year 3 and Year 4 (KMITL-Queensland Double-Degree Program)</h2>
                        <p>The students joining the KMITL-Queensland Double-Degree Program will take courses in Years 3 and 4 in Software Engineering Program at the Faculty of Engineering, Architecture and Information Technology, University of Queensland.</p>
                    </div>
                </div>
                <div className="curriculumCourseDetail">
                    <div className="courseDetailYear">
                        <h2>Year 1</h2>
                        <div className="courseDetailSemesterContainer">
                            <div className="courseDetailSemester">
                                <h4>Semester 1</h4>
                                <CourseDetail details={year1Semester1}/>
                            </div>
                            <div className="courseDetailSemester">
                                <h4>Semester 2</h4>
                                <CourseDetail details={year1Semester2}/>
                            </div>
                        </div>
                    </div>
                    <div className="courseDetailYear">
                        <h2>Year 2</h2>
                        <div className="courseDetailSemesterContainer">
                            <div className="courseDetailSemester">
                                <h4>Semester 1</h4>
                                <CourseDetail details={year2Semester1}/>
                            </div>
                            <div className="courseDetailSemester">
                                <h4>Semester 2</h4>
                                <CourseDetail details={year2Semester2}/>
                            </div>
                        </div>
                    </div>
                    <div className="courseDetailYear">
                        <h2>Year 3</h2>
                        <div className="courseDetailSemesterContainer">
                            <div className="courseDetailSemester">
                                <h4>Semester 1</h4>
                                <CourseDetail details={year3Semester1}/>
                            </div>
                            <div className="courseDetailSemester">
                                <h4>Semester 2</h4>
                                <CourseDetail details={year3Semester2}/>
                            </div>
                        </div>
                    </div>
                    <div className="courseDetailYear">
                        <h2>Year 4</h2>
                        <div className="courseDetailSemesterContainer">
                            <div className="courseDetailSemester">
                                <h4>Semester 1</h4>
                                <CourseDetail details={year4Semester1}/>
                            </div>
                            <div className="courseDetailSemester">
                                <h4>Semester 2</h4>
                                <CourseDetail details={year4Semester2}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer theme={'dark'}/>
        </>
        
    );
}

export default Curriculum