import React from "react";
import "./Glasgow.css";
import ControlledCarousel from "../../components/body/carousel/ControlledCarousel";
import Logo from "../../components/Logo";
import Detail from "../../components/detail/Detail";
import Footer from "../../components/footer/Footer";
import { arr1, arr2, arr3, slides } from "../../constants";


function Glasgow() {
  
  return (
    <div className="glasgow-Container1">
      <div className="glasgow-imgContainer">
        <Logo src="https://www.se.kmitl.ac.th/assets/se.png" width={"225"} />
        <Logo
          src={"https://cdn-icons-png.flaticon.com/128/1828/1828778.png"}
          width={"20"}
        />
        <Logo
          src="http://se.kmitl.ac.th/assets/logoglasgowuniversitysmall.png"
          width={"300"}
        />
      </div>
      <div>
        <ControlledCarousel slides={slides} theme={"light"} />
      </div>
      <div className="glasgow-article1">
          <h1>
            <strong>PROGRAM STRUCTURE</strong>
          </h1>
          <h2>YEARS 1 AND 2</h2>
          <p>
            Students follow years 1 and 2 of the KMITL programme
          </p>
          <h2>YEARS 3, 4 AND 5</h2>
          <p>
            Year 3 covers a broad range of topics and emphasises the skills needed
            for team-based software development when working with real-world
            customers. After year 3, BSc students spend their summer on a paid
            placement in industry. This placement lasts a full year for MSci with
            work placement students. The final year (4 or 5) includes advanced
            courses on software engineering and a substantial individual project,
            frequently in collaboration with employers. BSc students can extend
            their degree by an additional year and graduate with an MSci. A
            decision regarding whether a student can transfer to the MSci will be
            taken by the University at the end of Year 3.
          </p>
          <Detail arr={arr1} hideText={'- Course Details'} showText={'+ Course Details'}/>
      </div>
      <div className="glasgow-article4">
        <h1>
          <strong>DEGREES</strong>
        </h1>
        <h4>BSc Honours degree in Software Engineering from the University of Glasgow</h4>
        <h4>B.Eng. degree in Software Engineering from KMITL</h4>
      </div>
      <div className="glasgow-article2">
        <h1>
          <strong>ENTRY REQUIREMENTS</strong>
        </h1>
        <p>For entry to the University of Glasgow in Level 3 KMITL students will need to obtain a GPA of 3.2 in their first two years of study at KMITL. </p>
        <br />
        <br />
        <p>There is a maximum of 10 places guaranteed at the University of Glasgow for KMITL students on this programme. </p>
        <h2>ENGLISH LANGUAGE</h2>
        <p>For applicants whose first language is not English, the University sets a minimum English Language proficiency level.</p>
        <Detail arr={arr2} hideText={'- English language requirements'} showText={'+ English language requirements'} />
      </div>
      <div className="glasgow-article3">
        <h1>
          <strong>FEES AND FUNDING</strong>
        </h1>
        <h2>TUITION FEES</h2>
        <Detail arr={arr3} hideText={"- King Mongkut's Institute of Technology Ladkrabang (KMTIL) Glasgow Undergraduate Scholarship"} showText={"+ King Mongkut's Institute of Technology Ladkrabang (KMTIL) Glasgow Undergraduate Scholarship"}/>
      </div>
      <Footer theme={'dark'}/>
    </div>
  );
}

export default Glasgow;
