import React from "react";
import './Coworkingspace.css';
import Footer from "../../components/footer/Footer";
import ModelViewer from "../../components/3DModel/Coworkingspace";

function Coworkingspace(){
    return (
        <div>
            <ModelViewer />
            <Footer theme={'dark'}/>
        </div>
    );
}

export default Coworkingspace