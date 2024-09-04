import "./SubMenu.css";

function SubMenu({ items }) {
  return (
    <ul className={`submenu`}>
      {items.map((item, index) => (
        <li key={index}>
            {item[0]}<br/>
            <span className="small-text">{item[1]}</span>
            <hr/>
        </li>
      ))}</ul>
  );
}

export default SubMenu;
