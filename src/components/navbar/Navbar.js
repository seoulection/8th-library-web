import React from 'react';
import NavbarLinks from './NavbarLinks';

function Navbar() {
  return (
    <nav data-testid="Navbar" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <a className="navbar-brand" href="/">8th Library</a>
        </div>
        <div className="navbar-collapse collapse">
          <ul className="nav navbar-nav navbar-right">
            <NavbarLinks />
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
