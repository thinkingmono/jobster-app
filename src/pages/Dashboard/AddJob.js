import { FormRow, FormRowSelect } from "../../components"
import Wrapper from "../../assets/wrappers/DashboardFormPage"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { handleChange, clearValues, createJob } from "../../features/job/jobSlice"

const AddJob = () => {
  const { isLoading, position, company, jobLocation, jobTypeOptions, jobType, statusOptions, status, isEditing, editJobId } = useSelector((store) => store.job)
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      toast.error('Please fill out all fields');
      return;
    }
    dispatch(createJob({ position, company, jobLocation, jobType, status }));
  }

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value
    // console.log(name, value);
    dispatch(handleChange({ name, value }));
  }

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? 'edit job' : 'add job'}</h3>
        <div className="form-center">
          <FormRow type='text' name='position' value={position} onChange={handleJobInput} />
          <FormRow type='text' name='company' value={company} onChange={handleJobInput} />
          <FormRow type='text' labelText='Job Location' name='jobLocation' value={jobLocation} onChange={handleJobInput} />
          <FormRowSelect name='status' value={status} onChange={handleJobInput} list={statusOptions} />
          <FormRowSelect name='jobType' labelText='job type' value={jobType} onChange={handleJobInput} list={jobTypeOptions} />
          <div className="btn-container">
            <button type="button" className="btn btn-block clear-btn" onClick={() => dispatch(clearValues())}>Clear</button>
            <button type="submit" className="btn btn-block submit-btn" onClick={handleSubmit} disabled={isLoading}>{isLoading ? 'Loading...' : 'Submit'}</button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddJob