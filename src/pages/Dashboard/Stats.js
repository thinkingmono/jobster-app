import { useDispatch, useSelector } from "react-redux"
import { ChartsContainer, Loading, StatsContainer } from "../../components"
import { useEffect } from "react"
import { showStats } from "../../features/allJobs/allJobsSlice";

const Stats = () => {
  const { isLoading, monthlyApplications } = useSelector((store) => store.allJobs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showStats());
  }, [])

  if (isLoading) {
    return <Loading center />
  }

  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  )
}

export default Stats