import Wrapper from "../assets/wrappers/Navbar"
import { FaAlignLeft, FaUserCircle, FaCaretDown } from '../../node_modules/react-icons/fa'
import Logo from "./Logo"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearStore, toggleSidebar } from "../features/user/userSlice"

//Page Navbar
const Navbar = () => {
    //Destructure user from user's store.
    const { user } = useSelector((store) => store.user);
    //Dispatch declaration
    const dispatch = useDispatch();
    //showLogout state variable
    const [showLogout, setShowLogout] = useState(false);

    //Call dispatch to run toggleSidebar and show or hide the sidebar.
    const toggle = () => {
        dispatch(toggleSidebar())
    }

    return (
        <Wrapper>
            <div className="nav-center">
                {/*Sidebar Toggle Button*/}
                <button type="button" className="toggle-btn" onClick={toggle}><FaAlignLeft /></button>
                {/*Logo*/}
                <div>
                    <Logo />
                    <h3 className="logo-text">Dashboard</h3>
                </div>
                {/*Navbar Actions*/}
                <div className="btn-container">
                    {/*User session button*/}
                    <button type="button" className="btn" onClick={() => setShowLogout(!showLogout)}><FaUserCircle />{user?.name}<FaCaretDown /></button>
                    {/*Show logout dropdown*/}
                    <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
                        {/*Logout button. Call dispatch to run clearStore to clear user data from localStorage.*/}
                        <button type="button" className="dropdown-btn" onClick={() => dispatch(clearStore('Logging out...'))}>Logout</button>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default Navbar