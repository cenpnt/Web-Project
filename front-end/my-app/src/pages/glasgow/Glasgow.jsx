import React from "react";
import "./Glasgow.css";
import ControlledCarousel from "../../components/body/carousel/ControlledCarousel";
import Logo from "../../components/Logo";

function Glasgow() {
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
      <div className="glasgow-article">
        <article>
          <h3>
            <strong>Admission</strong>
          </h3>
          <p>
            Requirement for the students who wish to join this double-degree
            program:
          </p>
          <ul>
            <li>
              Completed Year 2 of the B.Eng. in Software Engineering program
              with GPA of 3.2 or more
            </li>
            <li>IELTS score of 6.5 or more, with no subtest below 6.0</li>
          </ul>
          <hr />
          <br />
          <br />
          <h3>
            <strong>Degrees</strong>
          </h3>
          <p>
            Students who have completed Year 4 of this double-degree program
            will be awarded a{" "}
            <strong>
              BSc Honours degree in Software Engineering from the University of
              Glasgow
            </strong>{" "}
            and a{" "}
            <strong>B.Eng. degree in Software Engineering from KMITL</strong>.
            Students who maintain good academic records during their studies at
            the University of Glasgow will be eligible to transfer to a one-year
            Master program in Software Engineering at the end of Year 4 and
            graduate with the Master of Science degree in Software Engineering
            awarded by University of Glasgow at the end of Year 5.
          </p>
        </article>
      </div>
    </div>
  );
}

export default Glasgow;
