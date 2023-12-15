import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"


//Protect route component. Handle unauthorize users.
const ProtectedRoute = ({ children }) => {
    //Destructure user from user´s store.
    const { user } = useSelector((store) => store.user);
    //If there are no user. Navigate to home page.
    if (!user) {
        return <Navigate to='/landing' />
    }
    return children;
}

export default ProtectedRoute