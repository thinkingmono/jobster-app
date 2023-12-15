import { Outlet } from "react-router-dom"
import Wrapper from "../../assets/wrappers/SharedLayout"
import { BigSidebar, Navbar, SmallSidebar } from "../../components"

//Main layout
const SharedLayout = () => {
  return (
    <>
      <Wrapper>
        <main className="dashboard">
          {/*Mobile sidebar*/}
          <SmallSidebar />
          {/*Desktop sidebar*/}
          <BigSidebar />
          <div>
            {/*Navbar*/}
            <Navbar />
            {/*Dashboard*/}
            <div className="dashboard-page">
              {/*All routes*/}
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </>
  )
}

export default SharedLayout