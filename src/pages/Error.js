import { Link } from "react-router-dom"
import notFoundImg from '../assets/images/not-found.svg'
import Wrapper from "../assets/wrappers/ErrorPage"

//Error page
const Error = () => {
  return (
    <Wrapper className="full-page">
      <div>
        <img src={notFoundImg} alt='not found' />
        <h3>Ohh! Page not found</h3>
        <p>We can't seem to find the age you're looking for</p>
        <Link to='/'>Back home</Link>
      </div>
    </Wrapper>
  )
}

export default Error