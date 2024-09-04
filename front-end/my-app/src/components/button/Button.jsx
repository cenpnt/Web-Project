import './Button.css'

function Button({text, onclick}) {

    return (
        <button onclick={onclick}>
            {text} 
        </button>
    );
}

export default Button