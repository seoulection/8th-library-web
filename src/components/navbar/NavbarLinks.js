import React from 'react';
import { Link } from 'react-router-dom';
import GoogleLogoutLink from './GoogleLogoutLink';

function NavbarLinks() {
  return (
    <>
      <li data-testid="NavbarLink"><Link to="/dashboard">Dashboard</Link></li>
      <li data-testid="NavbarLink"><Link to="/">Listings</Link></li>
      <li data-testid="NavbarLink"><Link to="/books/add">Add Book</Link></li>
      <li data-testid="NavbarLink"><GoogleLogoutLink /></li>
    </>
  );
}

export default NavbarLinks;
