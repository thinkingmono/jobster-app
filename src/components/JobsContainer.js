import { useEffect } from "react"
import Job from "./Job"
import Wrapper from "../assets/wrappers/JobsContainer"
import { useDispatch, useSelector } from "react-redux"
import Loading from "./Loading"
import { getAllJobs } from "../features/allJobs/allJobsSlice"
import PageBtnContainer from "./PageBtnContainer"

//Container where jobs display.
const JobsContainer = () => {
    //Destructure allJobs state properties from allJobs store.
    const { jobs, isLoading, page, totalJobs, numOfPages, search, searchStatus, searchType, sort } = useSelector((store) => store.allJobs);
    //Dispatch declaration
    const dispatch = useDispatch();

    //Fetch user's jobs when page loads. Re-Render when page, searchm searchStatus, searcchType and sort values changes.
    useEffect(() => {
        dispatch(getAllJobs());
    }, [page, search, searchStatus, searchType, sort])

    //Check if it is loading. if it's render loader component.
    if (isLoading) {
        return <Wrapper>
            <Loading center />
        </Wrapper>
    }

    //Check if there are jobs. If not, render a msg.
    if (jobs.length === 0) {
        return <Wrapper>
            <h2>No jobs to display</h2>
        </Wrapper>
    }

    return (
        <Wrapper>
            {/*Show total jobs fetch based in the query*/}
            <h5>{totalJobs} job{jobs.length > 1 && 's'} found</h5>
            {/*Render fetched jobs using map through Job component.*/}
            <div className="jobs">
                {jobs.map((job) => {
                    return <Job key={job._id} {...job} />
                })}
            </div>
            {/*Render navigation page container if the query throws results for more than 1 page.*/}
            {numOfPages > 1 && <PageBtnContainer />}
        </Wrapper>
    )
}

export default JobsContainer