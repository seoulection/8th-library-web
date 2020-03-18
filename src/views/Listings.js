import React from 'react';
import { currentUser } from '../api/UserAPI';

class Listings extends React.Component {
  getCurrentUser = async () => {
    try {
      const response = await currentUser();
      console.log(response);
    } catch(err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div className="Listings">
        <h1>Listings</h1>
        <button onClick={this.getCurrentUser}>
          Hi
        </button>
      </div>
    );
  }
}

export default Listings;
