import { React, useState, useEffect } from 'react';
import lottery from '../../img/lottery.svg';
import profilePic from '../../img/profile.png';
import { Link } from 'react-router-dom';
import UserService from '../../services/UserService';
import 'bootstrap/dist/css/bootstrap.css';
import './Profile.css';

const Profile = () => {
  const [about, setAbout] = useState({
    loaded: false,
    avatar: '',
    name: '',
    surname: '',
    phone: '',
    email: '',
    date: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    UserService.getUser().then((user) => {
      setAbout(user);
      setLoading(true);
    });
  }, []);

  return (
    <>
      {loading ? (
        <div className='profile-container'>
          <div className='profile-navbar'>
            <h4 className='profile-h4'>About Me</h4>
            <img src={lottery} alt='' className='profile-logo' />
            <div className='profile-btn'>
              <Link
                style={{
                  backgroundColor: '#9dd1df',
                  border: 'none',
                  color: 'rgb(36, 35, 35)',
                  margin: '0px 10px 6px 20px',
                  padding: '10px',
                  height: '45px',
                  borderRadius: '5px',
                  outline: 'none !important',
                  width: '80px',
                  fontWeight: '700',
                }}
                to='/categories'
              >
                Back
              </Link>
            </div>
          </div>
          <div className='about-me'>
            <div className='profile-details'>
              <div className='header-me'>
                <h4>
                  Welcome {about.name} {about.surname}
                </h4>
              </div>
              <div className='pic-me'>
                <img src={profilePic} alt='' />
              </div>
              <div className='phone-me'>
                <label>Phone: {about.phone}</label>
              </div>
              <div className='mail-me'>
                <label>E-Mail: {about.email}</label>
              </div>
              <div className='date-reg'>
                <label>Registration Date: {about.date.split('T')[0]}</label>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='d-flex justify-content-center'>
          <div className='spinner-border' role='status'>
            <span className='sr-only'>Loading...</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
