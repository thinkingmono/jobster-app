import Wrapper from '../assets/wrappers/SmallSidebar'
import { FaTimes } from '../../node_modules/react-icons/fa'
import { NavLink } from 'react-router-dom'
import Logo from './Logo'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSidebar } from '../features/user/userSlice'
import NavLinks from './NavLinks'

const SmallSidebar = () => {
    const { isSidebarOpen } = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const toggle = () => {
        dispatch(toggleSidebar());
    }
    return (
        <Wrapper>
            <div className={isSidebarOpen ? "sidebar-container show-sidebar" : "sidebar-container"}>
                <div className="content">
                    <button type="button" className="close-btn" onClick={toggle}><FaTimes /></button>
                    <header><Logo /></header>
                    <NavLinks toggleSidebar={toggle} />
                </div>
            </div>
        </Wrapper >
    )
}

export default SmallSidebar