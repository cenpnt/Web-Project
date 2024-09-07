import React from 'react';
import './Button.css';
import { useNavigate } from "react-router-dom";

function Button({ text, path, theme }) {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate(`${path}`);
    }

    return (
        <button onClick={handleLoginClick} className={`btn ${theme}`}>
        {text}
        </button>
    );
}

export default Button;