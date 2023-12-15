import { useSelector } from "react-redux"
import Wrapper from "../assets/wrappers/BigSidebar"
import Logo from "./Logo"
import NavLinks from "./NavLinks"

//Desktop Sidebar
const BigSidebar = () => {
    //Destructure isSidebarOpen from user's store.
    const { isSidebarOpen } = useSelector((store) => store.user);
    return (
        <Wrapper>
            {/*If isSidebarOpen is true hide sidebar,if not show || truncate due to mobile sidebar.*/}
            <div className={isSidebarOpen ? 'sidebar-container' : 'sidebar-container show-sidebar'}>
                <div className="content">
                    <header><Logo /></header>
                    <NavLinks />
                </div>
            </div>
        </Wrapper>
    )
}

export default BigSidebar