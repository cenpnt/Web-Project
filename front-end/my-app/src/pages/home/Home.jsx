import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import HomeBody1 from "../../components/body/HomeBody1";
import HomeBody2 from "../../components/body/HomeBody2";
import HomeBody3 from "../../components/body/HomeBody3";
import Footer from "../../components/footer/Footer";
import { Fade } from "react-awesome-reveal";

function Home() {
  return (
    <div className="Home">
      <Fade>
        <HomeBody1 />
      </Fade>
      <div className="carousel">
        <HomeBody2 />
      </div>
      <HomeBody3 />
      <Footer theme={"dark"} />
    </div>
  );
}

export default Home;
