import { NavLink } from "react-router-dom";
import links from "../utils/links";

//Navigation Links
const NavLinks = ({ toggleSidebar }) => {
    return (
        <div className="nav-links">
            {/*Render navigation links using map. Display NavLink to corresponding page. Hide sidebar when click. Set active class*/}
            {links.map((link) => {
                const { id, text, path, icon } = link;
                return <NavLink to={path} key={id} onClick={toggleSidebar} className={({ isActive }) =>
                    isActive ? 'nav-link active' : 'nav-link'}>
                    <span className="icon">{icon}</span>
                    {text}
                </NavLink>
            })}
        </div>
    )
}

export default NavLinks