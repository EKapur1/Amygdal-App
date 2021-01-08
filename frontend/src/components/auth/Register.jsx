import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../img/lottery-display.png';
import lottery from '../../img/lottery.svg';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    phone: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, surname, phone, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.log('Passwords do not match');
    } else {
      const newUser = {
        name: name,
        surname: surname,
        phone: phone,
        email: email,
        password: password,
      };
      axios
        .post('http://localhost:5000/api/registration', newUser)
        .then((response) => {
          console.log('Success');
        });
      console.log(newUser);
    }
  };

  return (
    <div className='reg-container'>
      <div className='img'>
        <Link to='/'>
          <img src={lottery} alt='' className='lottery' />
        </Link>
        <img src={logo} alt='' />
      </div>
      <section>
        <h1 className='register-head'>Register</h1>
        <p className='lead-register'>
          Use Lottery Display the way your team works best.
        </p>
        <small>
          Let's helps teams work more collaboratively and get more done.
        </small>
        <form className='form' onSubmit={(e) => onSubmit(e)}>
          <div className='form-group'>
            <label htmlFor='name'>First Name</label>
            <input
              type='text'
              name='name'
              value={name}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='surname'>Last Name</label>
            <input
              type='text'
              name='surname'
              value={surname}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='phone'>Phone Number</label>
            <input
              type='tel'
              name='phone'
              value={phone}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              name='email'
              value={email}
              onChange={(e) => onChange(e)}
              required
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
          <div className='form-group'>
            <label htmlFor='password2'>Confirm Password</label>
            <input
              value={password2}
              onChange={(e) => onChange(e)}
              type='password'
              name='password2'
              minLength='6'
            />
          </div>
          <input
            type='submit'
            className='register-btn'
            value='Create Account'
          />
        </form>
        <p className='my-1'>
          Already have an account? <Link to='/login'>Log In</Link>
        </p>
        <p className='my-1'>
          <Link to='/'>← Go Back to Home Page</Link>
        </p>
      </section>
    </div>
  );
};

export default Register;
