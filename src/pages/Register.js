import { useState, useEffect } from "react"
import { FormRow, Logo } from "../components"
import Wrapper from "../assets/wrappers/RegisterPage"
import { toast } from "react-toastify"

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true
}

const Register = () => {
  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(`${name}:${value}`);
    setValues({ ...values, [name]: value });
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      toast.error('Please fill out all the fields');
      return;
    }
  }

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  }

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        {!values.isMember && (
          <FormRow labelText='Name' type='text' name='name' value={values.name} onChange={handleChange} />
        )}
        <FormRow labelText='Email' type='email' name='email' value={values.email} onChange={handleChange} />
        <FormRow labelText='Password' type='password' name='password' value={values.password} onChange={handleChange} />
        <button type="submit" className="btn btn-block">Submit</button>
        <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}
          <button type="button" onClick={toggleMember} className="member-btn">{values.isMember ? 'Register' : 'Login'}</button>
        </p>
      </form>
    </Wrapper>
  )
}

export default Register