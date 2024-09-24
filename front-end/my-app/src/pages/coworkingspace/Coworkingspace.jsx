import React from "react";
import './Coworkingspace.css';
import Footer from "../../components/footer/Footer";
import ModelViewer from "../../components/3DModel/Coworkingspace3D";

function Coworkingspace(){
    return (
        <div className="co-Container">
            <h2 className="co-Text">Co-Working Space Booking System</h2>
            <ModelViewer />
            <Footer theme={'dark'}/>
        </div>
    );
}

export default Coworkingspace