import React from 'react';
import './Button.css';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';

function Button({ theme }) {
    const { buttonText, buttonPath, buttonClick } = useAuth();
    const navigate = useNavigate();

    const handleOnClick = () => {
        if(buttonClick) {
            buttonClick();
        } else {
            navigate(buttonPath);
        }
    }

    return (
        <button onClick={handleOnClick} className={`btn ${theme}`}>
            {buttonText}
        </button>
    );
}

export default Button;