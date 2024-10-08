import React from "react";
import Box from "./box/Box";
import { box1, box2 } from "../../constants";

function HomeBody3() {
  
  return (
    <div>
      <Box box={box1} path={"/glasgow-doubledegree"} />
      <Box box={box2} path={"/queensland-doubledegree"} />
    </div>
  );
}

export default HomeBody3;
