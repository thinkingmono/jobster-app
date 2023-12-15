import { useState } from "react"
import { FormRow } from "../../components"
import Wrapper from "../../assets/wrappers/DashboardFormPage"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { updateUser } from "../../features/user/userSlice"

//Profile page
const Profile = () => {
  //Destructure isLoading and User from user's store.
  const { isLoading, user } = useSelector((store) => store.user);
  //Dispatch declaration
  const dispatch = useDispatch();
  //State variable declaration to store user's form info state.
  const [userData, setUserData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    lastName: user?.lastName || '',
    location: user?.location || ''
  })

  //Handle form's onSubmit event.
  const handleSubmit = (e) => {
    e.preventDefault();
    //Destructure fields from userData with their current values.
    const { name, email, lastName, location } = userData;
    //Check if there is an empty field. If it is. Throws a notification.
    if (!name || !email || !lastName || !location) {
      toast.error('Please fill out all fields');
      return;
    }
    //If all fields are filled call dispatch to run updateUser to modify user's info with new values from the form fields.
    dispatch(updateUser({ name, email, lastName, location }));
  }

  //Handle form fields value change while typing.
  const handleChange = (e) => {
    //Capture field name that has been modified
    const name = e.target.name;
    //Capture field value that has been modified
    const value = e.target.value;
    //Set userData state variable with same values, except for the one that has been modified, it'll be a new one.
    setUserData({ ...userData, [name]: value });
  }

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>Profile</h3>
        <div className="form-center">
          {/*Name Field*/}
          <FormRow type='text' name='name' value={userData.name} onChange={handleChange} />
          {/*Last Name Field*/}
          <FormRow type='text' labelText='last name' name='lastName' value={userData.lastName} onChange={handleChange} />
          {/*Email Field*/}
          <FormRow type='email' name='email' value={userData.email} onChange={handleChange} />
          {/*Location Field*/}
          <FormRow type='text' name='location' value={userData.location} onChange={handleChange} />
          {/*Submit Button*/}
          <button type="submit" className="btn btn-block" disabled={isLoading}>{isLoading ? 'Please wait...' : 'Save Changes'}</button>
        </div>
      </form>
    </Wrapper>
  )
}

export default Profile