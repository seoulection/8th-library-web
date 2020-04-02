import React from 'react';
import NavbarFilterForm from '../forms/NavbarFilterForm';
import NavbarLinks from './NavbarLinks';

function Navbar(props) {
  return (
    <nav data-testid="Navbar" className="navbar fixed-top navbar-dark bg-dark">
      <a className="navbar-brand" href="/">8th Library</a>
      <NavbarFilterForm
        onCheckboxChange={props.onCheckboxChange}
        onFilterChange={props.onFilterChange}
      />
      <ul className="nav">
        <NavbarLinks />
      </ul>
    </nav>
  );
}

export default Navbar;
