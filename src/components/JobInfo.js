import Wrapper from "../assets/wrappers/JobInfo"

//Icon | text render information into JobCard.
const JobInfo = ({ icon, text }) => {
    return (
        <Wrapper>
            <span className="icon">{icon}</span>
            <span className="text">{text}</span>
        </Wrapper>
    )
}

export default JobInfo