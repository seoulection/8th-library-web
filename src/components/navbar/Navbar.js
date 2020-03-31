import React from 'react';
import NavbarFilterForm from '../forms/NavbarFilterForm';
import NavbarLinks from './NavbarLinks';

function Navbar(props) {
  return (
    <nav data-testid="Navbar" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <a className="navbar-brand" href="/">8th Library</a>
        </div>
        <NavbarFilterForm
          onCheckboxChange={props.onCheckboxChange}
          onFilterChange={props.onFilterChange}
        />
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
