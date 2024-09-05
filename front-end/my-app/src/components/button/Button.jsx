import './Button.css'

function Button({text, onclick}) {

    return (
        <button onclick={onclick} className='btn'>
            {text} 
        </button>
    );
}

export default Button