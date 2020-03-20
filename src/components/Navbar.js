import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = props => {
  if (props.show) {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <a className="navbar-brand" href="/">8th Library</a>
          </div>
          <div className="navbar-collapse collapse">
            <ul className="nav navbar-nav navbar-right">
              <li><Link to="/listings">Listings</Link></li>
              <li><Link to="/books/add">Add Book</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
  return null;
}

export default Navbar;
