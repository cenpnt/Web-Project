import React from 'react';
import "./SubMenu.css";

function SubMenu({ items }) {
  return (
    <ul className={`submenu`}>
      {items.map((item, index) => (
        <li key={index}>
            <span className='submenu-text'>{item[0]}</span><br/>
            <span className="small-text">{item[1]}</span>
            <hr/>
        </li>
      ))}</ul>
  );
}

export default SubMenu;
