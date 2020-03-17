import React from 'react';
import GoogleAuth from '../components/GoogleAuth';

class Listings extends React.Component {
  render() {
    return (
      <div className="Listings">
        <h1>Listings</h1>
        <GoogleAuth />
      </div>
    );
  }
}

export default Listings;
