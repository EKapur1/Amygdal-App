import React, { Fragment, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import logo from '../../img/lottery-display.png';
import lottery from '../../img/lottery.svg';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [hasToken, setHasToken] = useState(
    localStorage.getItem('token') ? true : false
  );

  useEffect(() => {
    if (!localStorage.getItem('token')) setHasToken(false);
    else setHasToken(true);
  }, [hasToken]);

  // const [isSubmited, setIsSubmited] = useState(false);

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
      password: password,
    };
    axios.post('http://localhost:5000/api/login', userLog).then((response) => {
      localStorage.setItem('token', JSON.stringify(response.data.token));
      setHasToken(true);
    });
  };

  return (
    <div className='login-container'>
      {hasToken ? (
        <Redirect to='/categories' />
      ) : (
        <>
          <div className='img'>
            <Link to='/'>
              <img src={lottery} alt='' className='lottery' />
            </Link>
            <img src={logo} alt='' />
          </div>
          <section>
            <h1 className='title'>Log In</h1>
            <p className='lead'>
              <i></i> Log In Into Your Account
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
              <input type='submit' className='login-btn' value='Login' />
            </form>
            <p className='my-1'>
              Don't have an account?
              <Link to='/register' className='links'>
                Sign Up
              </Link>
            </p>
            <p className='my-1'>
              <Link to='/' className='links'>
                ← Go Back to Home Page
              </Link>
            </p>
          </section>
        </>
      )}
    </div>
  );
};

export default Login;
