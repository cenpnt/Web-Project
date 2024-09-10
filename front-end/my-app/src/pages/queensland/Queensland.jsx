import React from "react";
import "./Queensland.css";
import ControlledCarousel from "../../components/body/carousel/ControlledCarousel";
import Logo from "../../components/Logo";
import Detail from "../../components/Detail";
import Footer from "../../components/footer/Footer";

function Queensland() {

  const ielts = {
    header:
      "International English Language Testing System (IELTS) Academic module (not General Training)",
    description: "",
    coreCourses: [
      "6.5 with no sub-test under 6.0.",
      "Tests must have been taken within 2 years 5 months of start date. Applicants must meet the overall and subtest requirements using a single test",
      "IELTS One Skill Retake accepted.",
    ],
  };

  const tution = {
    header: "",
    description: "",
    coreCourses: [
      " In Years 1-2, students in this double-degree program are to pay the KMITL tuition fee at the standard rate of 90,000 Baht/Semester.",
      "In Years 3-4, students are to pay the tuition fee and other fees as set out by UQ. All students in the program will be eligible to receive special scholarships from UQ which partially cover the fees at UQ. Details on the fees and scholarships will be announced soon.",
    ],
  };

  const arr2 = [ielts];
  const arr3 = [tution];

  const slides = [
    {
      image:
        "https://www.uq.edu.au/sites/default/files/styles/uqds_card/public/2023-12/st-lucia-campus.jpg?itok=39nkzdMY",
      alt: "Queensland University picture",
      title: "KMITL-Queensland<br/> Double-Degree Program",
      description:
        "The KMITL-Queensland Double-Degree Program in Software Engineering is a collaboration between KMITL and the University of Queensland (UQ), Australia. The program enables qualified students who have completed Year 2 in the Software Engineering program at KMITL to enter Years 3 and 4 of the Software Engineering program at the University of Queensland in Australia, and, upon completion, be awarded with software engineering degrees from both KMITL and UQ. The collaborative program aims to equip its students with advanced knowledge and skills of software engineering to prepare them for careers in the international software industry, as well as for research and postgraduate study in all computing-related fields.",
    },
    {
      image:
        "https://sen.news/wp-content/uploads/2019/06/QUT-MR-W.jpg",
      alt: "Queensland University picture",
      title: "KMITL-Queensland<br/> Double-Degree Program",
      description:
        "The KMITL-Queensland Double-Degree Program in Software Engineering is a collaboration between KMITL and the University of Queensland (UQ), Australia. The program enables qualified students who have completed Year 2 in the Software Engineering program at KMITL to enter Years 3 and 4 of the Software Engineering program at the University of Queensland in Australia, and, upon completion, be awarded with software engineering degrees from both KMITL and UQ. The collaborative program aims to equip its students with advanced knowledge and skills of software engineering to prepare them for careers in the international software industry, as well as for research and postgraduate study in all computing-related fields.",
    },
  ];

  return (
    <div className="queensland-Container1">
      <div className="queensland-imgContainer">
        <Logo src="https://www.se.kmitl.ac.th/assets/se.png" width={"225"} />
        <Logo
          src={"https://cdn-icons-png.flaticon.com/128/1828/1828778.png"}
          width={"20"}
        />
        <Logo
          src="https://courseseeker.edu.au/assets/images/institutions/3019.png"
          width={"300"}
        />
      </div>
      <div>
        <ControlledCarousel slides={slides} theme={"light"} />
      </div>
      <div className="queensland-article1">
        <h1>
          <strong>ABOUT UNIVERSITY OF QUEENSLAND</strong>
        </h1>
        <p>
          The University of Queensland (UQ) is a premier public research
          university located in Brisbane, Australia. Established in 1909, UQ has
          a rich heritage of fostering change through innovation and its
          contributions extend internationally​​​​​​. The university has
          consistently been ranked in the top 50 universities worldwide. The
          main campus in the riverside suburb of St Lucia is lauded for its
          picturesque and tranquil environment, while being easily accessible
          from the vibrant downtown center of Brisbane. The campus provides
          comprehensive infrastructure, world-class research facilities,
          state-of-the-art learning spaces, and on-campus student
          accommodations. Building on this foundation of academic excellence,
          UQ's Bachelor of Engineering program in Software Engineering is well
          recognized internationally and is accredited by Engineers Australia.
          The program boasts an up-to-date and flexible curriculum that
          emphasizes hands-on learning through problems and projects from the
          real world. Students can expect to engage in both team and individual
          projects, mirroring the collaborative nature of the industry and
          catering to future employment prospects in diverse settings, from
          small firms to large multinational corporations​.
        </p>
      </div>
      <div className="queensland-article2">
        <h1>
          <strong>Degree</strong>
        </h1>
        <h4>
          BEng (Hons) degree in Software Engineering from the University of
          Queensland
        </h4>
        <h4>B.Eng. degree in Software Engineering from KMITL</h4>
      </div>
      <div className="queensland-article3">
        <h1>
          <strong>ENTRY REQUIREMENTS</strong>
        </h1>
        <p>
          Completed Year 2 of the B.Eng. in Software Engineering program with
          GPA of 3.2 or more
        </p>
        <br />
        <br />
        <h2>ENGLISH LANGUAGE</h2>
        <p>
          For applicants whose first language is not English, the University
          sets a minimum English Language proficiency level.
        </p>
        <Detail
          arr={arr2}
          hideText={"- English language requirements"}
          showText={"+ English language requirements"}
        />
      </div>
      <div className="queensland-article4">
        <h1>
          <strong>FEES AND FUNDING</strong>
        </h1>
        <Detail
          arr={arr3}
          hideText={"- TUITION FEES"}
          showText={"+ TUITION FEES"}
        />
      </div>
      <Footer theme={"dark"} />
    </div>
  );
}

export default Queensland;
