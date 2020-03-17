import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';
import loginUser from '../api/UserAPI';

export class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        scope: 'profile'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.onAuthChange(this.auth.isSignedIn.get());
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  }

  onSignInClick = async () => {
    try {
      await this.auth.signIn();
      const currentUser = this.auth.currentUser.get().getBasicProfile();
      const data = {
        first_name: currentUser.getGivenName(),
        last_name: currentUser.getFamilyName(),
        email: currentUser.getEmail(),
        image_url: currentUser.getImageUrl()
      }
      const response = await loginUser(data);
    } catch(err) {
      console.log(err);
    }
  }

  onSignOutClick = async () => {
    await this.auth.signOut();
  }

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button className="GoogleLogout" onClick={this.onSignOutClick}>Logout</button>
      );
    } else {
      return (
        <button className="GoogleLogin" onClick={this.onSignInClick}>Login</button>
      );
    }
  }

  render() {
    return (
      <div className="GoogleAuth">
        {this.renderAuthButton()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
}

export default connect(
  mapStateToProps,
  { signIn, signOut }
)(GoogleAuth);
