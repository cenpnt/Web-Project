import React from 'react';
import './Button.css';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';

function Button({ text, path, onClick, theme }) {
    const { buttonText, buttonPath, buttonClick } = useAuth();
    const navigate = useNavigate();

    const buttonTextToShow = text || buttonText;
    const buttonPathToUse = path || buttonPath;
    const buttonClickHandler = onClick || buttonClick;

    const handleOnClick = () => {
        if (path) {
            navigate(path);
        } else if (buttonClickHandler) {
            buttonClickHandler();
        } else if (buttonPathToUse) {
            navigate(buttonPathToUse);
        }
    };

    return (
        <button onClick={handleOnClick} className={`btn ${theme}`}>
            {buttonTextToShow}
        </button>
    );
}

export default Button;
