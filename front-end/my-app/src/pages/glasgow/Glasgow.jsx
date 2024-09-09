import React from "react";
import "./Glasgow.css";
import ControlledCarousel from "../../components/body/carousel/ControlledCarousel";
import Logo from "../../components/Logo";
import Detail from "../../components/Detail";
import Footer from "../../components/footer/Footer";

function Glasgow() {
  const year1n2  = {
      header: 'YEARS 1 AND 2',
      description: 'You follow years 1 and 2 of the KMITL programme: BEng Software Engineering (International Programme)',
      coreCourses: []
  };

  const year3 = {
      header: 'YEAR 3',
      description: 'Core courses:',
      coreCourses: ['ALGORITHMICS I', 'DATA FUNDAMENTALS', 'HUMAN-CENTRED SYSTEMS DESIGN AND EVALUATION', 'SYSTEMS PROGRAMMING', 'PROFESSIONAL SOFTWARE DEVELOPMENT', 'TEAM PROJECT', 'SOFTWARE ENGINEERING SUMMER PLACEMENT']
  };

  const year4 = {
      header: 'YEAR 4',
      description: 'Core courses:',
      coreCourses: ['INDIVIDUAL PROJECT', 'PROFESSIONAL SKILLS AND ISSUES']
  };

  const year5 = {
      header: 'YEAR 5',
      description: 'Core courses:',
      coreCourses: ['RESEARCH METHODS AND TECHNIQUES FOR MSCI', 'MSCI RESEARCH PROPOSAL AND PROJECT', 'PROJECT RESEARCH READINGS IN COMPUTING SCIENCE']
  };

  const ielts = {
        header: 'International English Language Testing System (IELTS) Academic module (not General Training)',
        description: '',
        coreCourses: ['6.5 with no sub-test under 6.0.','Tests must have been taken within 2 years 5 months of start date. Applicants must meet the overall and subtest requirements using a single test','IELTS One Skill Retake accepted.']
  }

  const toefl = {
        header: 'TOEFL (ib, my best or athome)',
        description: '',
        coreCourses: ['90 with minimum R 20, L 19, S 19, W 23.','Tests must have been taken within 2 years 5 months of start date. Combined scores from two tests taken within 6 months of each other can be considered.']
  }

  const iGCSE = {
        header: 'School Qualification',
        description: '',
        coreCourses: ['iGCSE English or ESOL 0522/0500, grade C']
  }
  
  const KMITL ={
    header: '',
    description: "The School of Computing Science and James Watt School of Engineering is offering a discount to students from King Mongkut's Institute of Technology Ladkrabang wishing to complete their 3rd and 4th year of the BSc Software Engineering/BEng Biomedical Engineering at the University of Glasgow. A progression to the MSci/MEng may be available depending on the student's performance in year 3 and 4.",
    coreCourses: [],
  }
  const tution = {
    header: '',
    description: '',
    coreCourses: ["2 years at KMITL, Tuition fee : THB 180,000 per year", "2 years at Glasgow, Tuition fee with scholarship : GBP 17,536 per year"]
  }

  const arr1 = [year1n2, year3, year4, year5];
  const arr2 = [ielts, toefl, iGCSE];
  const arr3 = [KMITL, tution];
  
  const slides = [
    {
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/45/1c/9d/university-of-glasgow.jpg?w=1200&h=1200&s=1",
      alt: "Glasgow University picture",
      title: "KMITL-Glasgow<br/> Double-Degree Program",
      description:
        "The KMITL-Glasgow Double-Degree Program in Software Engineering is a collaboration between KMITL and the University of Glasgow, UK. The program enables qualified students who have completed Year 2 in the SE program at the International College to enter Years 3 and 4 of the Software Engineering program at the University of Glasgow's School of Computing Science. At Glasgow, the student will have an opportunity to study with world-renowned academics, as well as working on team projects with multi-national talents. This is an excellent opportunity for the students who wish to gain studying and living experience in the UK.",
    },
    {
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/45/1c/9d/university-of-glasgow.jpg?w=1200&h=1200&s=1",
      alt: "Glasgow University picture",
      title: "KMITL-Glasgow<br/> Double-Degree Program",
      description:
        "The KMITL-Glasgow Double-Degree Program in Software Engineering is a collaboration between KMITL and the University of Glasgow, UK. The program enables qualified students who have completed Year 2 in the SE program at the International College to enter Years 3 and 4 of the Software Engineering program at the University of Glasgow's School of Computing Science. At Glasgow, the student will have an opportunity to study with world-renowned academics, as well as working on team projects with multi-national talents. This is an excellent opportunity for the students who wish to gain studying and living experience in the UK.",
    },
  ];

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
      <Footer theme={'glasgow'}/>
    </div>
  );
}

export default Glasgow;
