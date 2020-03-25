import React from 'react';
import GoogleLogin from 'react-google-login';
import { useAuthContext } from '../contexts/AuthContext';
import { loginUser } from '../api/UserAPI';

function Login() {
  const { login, setUser } = useAuthContext();

  const loginSuccessful = ({ profileObj }) => {
    const userData = {
      first_name: profileObj.givenName,
      last_name: profileObj.familyName,
      email: profileObj.email,
      image_url: profileObj.imageUrl
    };

    loginUser(userData)
      .then(result => {
        setUser(result.user);
      })
      .then(() => login())
      .catch((err) => console.log(err))
  }

  const loginUnsuccessful = () => {
    console.log('Login unsuccessful');
  }

  return (
    <div className="text-center">
      <h1>8th Library</h1>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        onSuccess={loginSuccessful}
        onFailure={loginUnsuccessful}
      />
    </div>
  );
}

export default Login;
