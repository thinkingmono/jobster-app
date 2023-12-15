import { FaBriefcase, FaCalendarAlt, FaLocationArrow } from "react-icons/fa"
import { Link } from "react-router-dom"
import Wrapper from "../assets/wrappers/Job"
import { useDispatch } from "react-redux"
import JobInfo from "./JobInfo"
import moment from "moment"
import { deleteJob, setEditJob } from "../features/job/jobSlice"

//Jobcard in All Jobs page. Destructure props to render info iin the card.
const Job = ({ _id, position, company, jobLocation, jobType, createdAt, status }) => {
  //dispatch declaration
  const dispatch = useDispatch();
  //Format job's createAt using moment library.
  const date = moment(createdAt).format('MMM Do, YYYY');

  return (
    <Wrapper>
      {/*Jobcard's header*/}
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      {/*Jobcard's information*/}
      <div className="content">
        <div className="content-center">
          {/*Render info in text icon format*/}
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        {/*Jobcard's footer*/}
        <footer>
          {/*Jobcard's actions*/}
          <div className="actions">
            {/*Edit button. Call dispatch to run setEditJob. Pass job id and job form's info to render info in form fields. Link to Add Job page.*/}
            <Link to='/add-job' className='btn edit-btn' onClick={() => {
              dispatch(setEditJob({ editJobId: _id, position, company, jobLocation, jobType, status }))
            }}>Edit</Link>
            {/*Delete button. Call dispatch to run deleteJob to remove the job from the list.*/}
            <button type="button" className="btn delete-btn" onClick={() => dispatch(deleteJob(_id))}>Delete</button>
          </div>
        </footer>
      </div>
    </Wrapper>
  )
}

export default Job