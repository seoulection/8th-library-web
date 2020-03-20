import React from 'react';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';
import { loginUser } from '../api/UserAPI';

class Login extends React.Component {
  loginSuccessful = async ({ profileObj }) => {
    try {
      const data = {
        first_name: profileObj.givenName,
        last_name: profileObj.familyName,
        email: profileObj.email,
        image_url: profileObj.imageUrl
      };
      const response = await loginUser(data);
      this.props.signIn(response.data.current_user);
    } catch(err) {
      console.log(err);
    }
  }

  loginUnsuccessful = response => {
    console.log(response);
  }

  render() {
    return (
      <div className="text-center">
        <h1>8th Library</h1>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          onSuccess={this.loginSuccessful}
          onFailure={this.loginUnsuccessful}
        />
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
)(Login);
