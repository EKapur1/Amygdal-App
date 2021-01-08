import { React, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  const [hasToken, setHasToken] = useState(
    localStorage.getItem('token') ? true : false
  );

  return (
    <>
      {hasToken ? (
        <Redirect to='/categories' />
      ) : (
        <section className='landing'>
          <div className='landing-inner'>
            <h1>Welcome to Lottery Display</h1>
            <p className='lead'>
              Let's get you all set up so you can verify your personal
              <br />
              account and begin setting up your profile.
            </p>
            <div className='buttons'>
              <Link to='/register' className='landing-btn landing-register-btn'>
                Create Account
              </Link>
              <Link to='/login' className='landing-btn landing-btn-login'>
                Login
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Landing;
