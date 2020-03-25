import React from 'react';
import { Link } from 'react-router-dom';
import { useGoogleLogout } from 'react-google-login';
import { useAuthContext } from '../../contexts/AuthContext';
import { logoutUser } from '../../api/UserAPI';

function GoogleLogoutLink() {
  const { logout, setUser } = useAuthContext();

  const onLogoutSuccess = () => {
    logout();
    setUser(null);
  }

  const onLogoutFailure = () => {
    console.log('Failed to logout');
  }

  const { signOut } = useGoogleLogout({
    onFailure: onLogoutFailure,
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    onLogoutSuccess: onLogoutSuccess
  });

  const onLogoutClick = () => {
    logoutUser()
      .then(() => {
        signOut();
      })
      .catch(err => console.log(err))
  }

  return <Link data-testid="GoogleLogoutLink" onClick={onLogoutClick} to="#">Logout</Link>;
}

export default GoogleLogoutLink;
