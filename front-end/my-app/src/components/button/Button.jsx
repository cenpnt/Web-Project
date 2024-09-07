import React from 'react';
import './Button.css';
import { useNavigate } from "react-router-dom";

function Button({ text, path, theme, onClick }) {
    const navigate = useNavigate();

    const handleClick = () => {
        if(onClick) {
            onClick();
        } else {
            navigate(path);
        }
    }

    return (
        <button onClick={handleClick} className={`btn ${theme}`}>
            {text}
        </button>
    );
}

export default Button;