import React from 'react';
import { Link } from 'react-router-dom';
import GoogleLogoutLink from './GoogleLogoutLink';

function NavbarLinks() {
  return (
    <>
      <li data-testid="NavbarLink" className="nav-item">
        <Link className="nav-link text-light" to="/dashboard">Dashboard</Link>
      </li>
      <li data-testid="NavbarLink" className="nav-item">
        <Link className="nav-link text-light" to="/">Listings</Link>
      </li>
      <li data-testid="NavbarLink" className="nav-item">
        <Link className="nav-link text-light" to="/books/add">Add Book</Link>
      </li>
      <li data-testid="NavbarLink" className="nav-item">
        <GoogleLogoutLink />
      </li>
    </>
  );
}

export default NavbarLinks;
