import React from 'react';
import NavbarLinks from './NavbarLinks';

function Navbar() {
  return (
    <nav className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <a className="navbar-brand" href="/">8th Library</a>
        </div>
        <div className="navbar-collapse collapse">
          <NavbarLinks />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
