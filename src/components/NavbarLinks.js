import React from 'react';
import { Link } from 'react-router-dom';
import GoogleLogoutLink from './GoogleLogoutLink';

function NavbarLinks() {
  return (
    <ul className="nav navbar-nav navbar-right">
      <li><Link to="/dashboard">Dashboard</Link></li>
      <li><Link to="/">Listings</Link></li>
      <li><Link to="/books/add">Add Book</Link></li>
      <li><GoogleLogoutLink /></li>
    </ul>
  );
}

export default NavbarLinks;
