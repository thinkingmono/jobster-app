import Wrapper from '../assets/wrappers/SmallSidebar'
import { FaTimes } from '../../node_modules/react-icons/fa'
import Logo from './Logo'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSidebar } from '../features/user/userSlice'
import NavLinks from './NavLinks'

//Mobile sidebar
const SmallSidebar = () => {
    //isSidebarOpen destructure from user's store.
    const { isSidebarOpen } = useSelector((store) => store.user);
    //Dispatch declaration
    const dispatch = useDispatch();

    //Sidebar toggle function calling dispatch to run toggleSidebar.
    const toggle = () => {
        dispatch(toggleSidebar());
    }
    return (
        <Wrapper>
            {/*If isSidebarOpen show sidebar. if not hide it*/}
            <div className={isSidebarOpen ? "sidebar-container show-sidebar" : "sidebar-container"}>
                <div className="content">
                    {/*Close button*/}
                    <button type="button" className="close-btn" onClick={toggle}><FaTimes /></button>
                    {/*Logo*/}
                    <header><Logo /></header>
                    {/*Navigation links*/}
                    <NavLinks toggleSidebar={toggle} />
                </div>
            </div>
        </Wrapper >
    )
}

export default SmallSidebar