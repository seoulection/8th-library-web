import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = props => {
  if (props.show) {
    return (
      <nav className="Navbar">
        <h1>Navbar</h1>
        <Link to="/listings">Listings</Link>
        <Link to="/books/add">Add Book</Link>
      </nav>
    );
  }
  return null;
}

export default Navbar;
