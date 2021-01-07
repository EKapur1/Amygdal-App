import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <section className='landing'>
      <div className='landing-page'>
        <div className='landing-inner'>
          <h1 className='x-large'>Welcome to Lottery Display</h1>
          <p className='lead'>
            Let's get you all set up so you can verify your personal
            <br />
            account and begin setting up your profile.
          </p>
          <div className='buttons'>
            <Link to='/register' className='btn btn-primary register-btn'>
              Create Account
            </Link>
            <Link to='/login' className='btn btn-light'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
