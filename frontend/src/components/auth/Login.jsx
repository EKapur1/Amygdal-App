import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../img/lottery-display.png';
import lottery from '../../img/lottery.svg';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const userLog = {
      email: email,
      password: password
    }
    axios.post('http://localhost:5000/api/login', userLog)
      .then((response) => {
      console.log(response.data);
    });
    console.log('Success');
  };

  return (
    <div className='login-container'>
      <div className='img'>
        <Link to='/'>
          <img src={lottery} alt='' className='lottery' />
        </Link>
        <img src={logo} alt='' />
      </div>
      <section>
        <h1 className='large text-primary'>Log In</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Log In Into Your Account
        </p>
        <form className='form' onSubmit={(e) => onSubmit(e)}>
          <div className='form-group'>
            <label htmlFor='email'>Email Address</label>
            <input
              type='email'
              name='email'
              value={email}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              value={password}
              onChange={(e) => onChange(e)}
              type='password'
              name='password'
              minLength='6'
            />
          </div>
          <input
            type='submit'
            className='btn btn-primary login-btn'
            value='Login'
          />
        </form>
        <p className='my-1'>
          Don't have an account? <Link to='/register'>Sign Up</Link>
        </p>
        <p className='my-1'>
          <Link to='/'>← Go Back to Home Page</Link>
        </p>
      </section>
    </div>
  );
};

export default Login;
