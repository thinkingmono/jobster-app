import { useDispatch, useSelector } from "react-redux"
import { ChartsContainer, Loading, StatsContainer } from "../../components"
import { useEffect } from "react"
import { showStats } from "../../features/allJobs/allJobsSlice";

//Stats page
const Stats = () => {
  //Destructure isLoading and monthlyApplications from allJobs store.
  const { isLoading, monthlyApplications } = useSelector((store) => store.allJobs);
  //Dispatch declaration.
  const dispatch = useDispatch();

  //Fetch user's jobs stats by state when page loads.
  useEffect(() => {
    dispatch(showStats());
  }, [])

  //If it is loading show loader.
  if (isLoading) {
    return <Loading center />
  }

  return (
    <>
      <StatsContainer />
      {/*If there are more than 0 job applications show charts container*/}
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  )
}

export default Stats