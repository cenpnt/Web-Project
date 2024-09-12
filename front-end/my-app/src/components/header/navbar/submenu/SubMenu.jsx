import React from 'react';
import "./SubMenu.css";

function SubMenu({ items }) {
  return (
    <ul className="submenu">
      {items.map((item, index) => (
        <li key={index}>
          <span className='submenu-text'>
            <a href={item.path}>{item.text}</a>
          </span>
          <br/>
          <span className="small-text">{item.smalltext}</span>
          <hr/>
        </li>
      ))}
    </ul>
  );
}
export default SubMenu;
