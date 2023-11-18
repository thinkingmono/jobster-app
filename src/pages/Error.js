import { Link } from "react-router-dom"
import notFoundImg from '../assets/images/not-found.svg'
import Wrapper from "../assets/wrappers/ErrorPage"

const Error = () => {
  return (
    <Wrapper className="full-page">
      <div>
        <img src={notFoundImg} alt='not found' />
        <h3>Text</h3>
        <p>text</p>
        <Link to='/'>Back home</Link>
      </div>
    </Wrapper>
  )
}

export default Error