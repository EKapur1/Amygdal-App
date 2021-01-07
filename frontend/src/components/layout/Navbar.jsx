import React from 'react';
import { Link } from 'react-router-dom';
import lottery from '../../img/lottery.svg';

const Navbar = () => {
  return (
    <nav className='navbar bg-dark'>
      <Link to='/'>
        <img src={lottery} alt='' />
      </Link>
      <ul>
        <li>
          <a href='!#'>Developers</a>
        </li>
        <li>
          <Link to='/register'>Register</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
