import React, { useState, useEffect } from 'react';
import './App.css';
import { useAuthContext } from './contexts/AuthContext';
import { currentUser } from './api/UserAPI';
import AuthenticatedApp from './AuthenticatedApp';
import UnauthenticatedApp from './UnauthenticatedApp';
import Loading from './components/Loading';

function App() {
  const { user, isLoggedIn, login, setUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) return;
    currentUser()
      .then(res => {
        login();
        setUser(res.data.user)
      })
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false))
  }, [login, setUser, user]);

  if (isLoading) return <Loading />;

  if (isLoggedIn) return <AuthenticatedApp />;

  return <UnauthenticatedApp />;
}

export default App;
