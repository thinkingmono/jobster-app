import { FormRow, FormRowSelect } from "../../components"
import Wrapper from "../../assets/wrappers/DashboardFormPage"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { handleChange, clearValues, createJob, editJob } from "../../features/job/jobSlice"
import { useEffect } from "react"

//Add Job Page
const AddJob = () => {
  //Destructure job's store state parameters
  const { isLoading, position, company, jobLocation, jobTypeOptions, jobType, statusOptions, status, isEditing, editJobId } = useSelector((store) => store.job)
  //Declare dispatch
  const dispatch = useDispatch();
  //Destructure user from user's store.
  const { user } = useSelector((store) => store.user);

  //Form action in submit's onClick button
  const handleSubmit = (e) => {
    e.preventDefault();
    //Check if there is an empty field
    if (!position || !company || !jobLocation) {
      toast.error('Please fill out all fields');
      return;
    }

    //Check if user is editing an already created job. If it is, call dispath to run editJob passing job id and job information as a parameters.
    if (isEditing) {
      dispatch(editJob({ jobId: editJobId, job: { position, company, jobLocation, jobType, status } }));
      return;
    }

    //Call dispatch to run create job, passing job info as a parameter for creation.
    dispatch(createJob({ position, company, jobLocation, jobType, status }));
  }

  //Controls job fields value change identifying wich field is change and their value. Then send field name and new value through handleChange.
  const handleJobInput = (e) => {
    //Capture field's name
    const name = e.target.name;
    //Capture field's value
    const value = e.target.value
    // console.log(name, value);
    //Send change to update job's state.
    dispatch(handleChange({ name, value }));
  }

  //When page renders check if it is editing, if not, upate jobLocation field with the user's location set in profile location.
  useEffect(() => {
    if (!isEditing) {
      // console.log(user.location);
      dispatch(handleChange({ name: 'jobLocation', value: user.location }));
    }
  }, [])

  return (
    <Wrapper>
      <form className="form">
        {/*Ternary to show form's title depending on isEditing value.*/}
        <h3>{isEditing ? 'edit job' : 'add job'}</h3>
        {/*Add Job Form*/}
        <div className="form-center">
          {/*Position Field*/}
          <FormRow type='text' name='position' value={position} onChange={handleJobInput} />
          {/*Company Field*/}
          <FormRow type='text' name='company' value={company} onChange={handleJobInput} />
          {/*Job Location Field*/}
          <FormRow type='text' labelText='Job Location' name='jobLocation' value={jobLocation} onChange={handleJobInput} />
          {/*Status Field Selector*/}
          <FormRowSelect name='status' value={status} onChange={handleJobInput} list={statusOptions} />
          {/*Job Type Field Selector*/}
          <FormRowSelect name='jobType' labelText='job type' value={jobType} onChange={handleJobInput} list={jobTypeOptions} />
          <div className="btn-container">
            {/*Clear Fields Button. Clear form fields values*/}
            <button type="button" className="btn btn-block clear-btn" onClick={() => dispatch(clearValues())}>Clear</button>
            {/*Submit Button. handleSubmit call in onCliclk event*/}
            <button type="submit" className="btn btn-block submit-btn" onClick={handleSubmit} disabled={isLoading}>{isLoading ? 'Loading...' : 'Submit'}</button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddJob