import { useState, useEffect } from "react"
import { FormRow, Logo } from "../components"
import Wrapper from "../assets/wrappers/RegisterPage"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { loginUser, registerUser } from "../features/user/userSlice"
import { useNavigate } from "react-router-dom"

//Register form default state
const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true
}

//Register form
const Register = () => {
  //Dispatch declaration
  const dispatch = useDispatch();
  //Destructure isLoading and user from user's store.
  const { isLoading, user } = useSelector((store) => store.user);
  //State variable declaration to handle register form values state.
  const [values, setValues] = useState(initialState);
  //navigate declaration.
  const navigate = useNavigate();

  //Handle form fields value change
  const handleChange = (e) => {
    //Capture field name that has been modified
    const name = e.target.name;
    //Capture field value that has been modified
    const value = e.target.value;
    // console.log(`${name}:${value}`);
    //Modify values state variable with fields new value preserving the rest of the fileds values.
    setValues({ ...values, [name]: value });
  }

  //Form's onSubmit event handle
  const onSubmit = (e) => {
    e.preventDefault();
    //Destructure form fields values from state variable
    const { name, email, password, isMember } = values;
    //Check if there is an empty field depending on if user is loging in or register.
    if (!email || !password || (!isMember && !name)) {
      toast.error('Please fill out all the fields');
      return;
    }

    //Check if user is a member. If it is call dispatch to send API request to the server and login the user with email and password type.
    if (isMember) {
      dispatch(loginUser({ email: email, password: password }));
      return;
    }

    //If it is not a member call dispatch to send API request to the server to register the new user.
    dispatch(registerUser({ name, email, password }));
  }

  //Login/Register form toggle show
  const toggleMember = () => {
    //toggle isMember parameter value.
    setValues({ ...values, isMember: !values.isMember });
  }

  //Check if the current session is an user when page loads or user or navigate values changes (user already login) if it is navigate to home.
  useEffect(() => {
    if (user) {
      setTimeout(() => { navigate('/') }, 1500);
    }
  }, [user, navigate])

  return (
    <Wrapper className="full-page">
      {/*Register/Login Form*/}
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        {/*If current session is a member shows Login title, if not, shows Register*/}
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        {/*If current session is not a member shows name field, if not, hide name field*/}
        {!values.isMember && (
          <FormRow labelText='Name' type='text' name='name' value={values.name} onChange={handleChange} />
        )}
        {/*Email Field*/}
        <FormRow labelText='Email' type='email' name='email' value={values.email} onChange={handleChange} />
        {/*Password Field*/}
        <FormRow labelText='Password' type='password' name='password' value={values.password} onChange={handleChange} />
        {/*Submit button*/}
        <button type="submit" className="btn btn-block" disabled={isLoading}>{isLoading ? 'loading ...' : 'Submit'}</button>
        {/*Demo user login button*/}
        <button type="button" className="btn btn-block btn-hipster" disabled={isLoading} onClick={() => dispatch(loginUser({ email: 'testUser@test.com', password: 'secret' }))}>{isLoading ? 'loading ...' : 'demo'}</button>
        <p>
          {/*If current session is a member show not a member yet, if not already a member*/}
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}
          {/*Toggle form show based on isMember value*/}
          <button type="button" onClick={toggleMember} className="member-btn">{values.isMember ? 'Register' : 'Login'}</button>
        </p>
      </form>
    </Wrapper>
  )
}

export default Register