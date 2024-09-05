import './Button.css';
import { useNavigate } from "react-router-dom";

function Button({ text, path }) {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate(`${path}`);
    }

    return (
        <button onClick={handleLoginClick} className='btn'>
        {text}
        </button>
    );
}

export default Button;