import './SubMenu.css';

function SubMenu({ items }) {

    return (
        <ul className='submenu'>
            {items.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
    );
    
}

export default SubMenu