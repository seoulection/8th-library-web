import React, { useState, useEffect } from 'react';
import './App.css';
import { useAuthContext } from './contexts/AuthContext';
import { currentUser } from './api/UserAPI';
import AuthenticatedApp from './AuthenticatedApp';
import UnauthenticatedApp from './UnauthenticatedApp';

function App() {
  const { isLoggedIn, login, setUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    currentUser()
      .then(res => {
        login();
        setUser(res.data.user)
      })
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false))
  }, [isLoggedIn]);

  if (isLoading) return <h1>Loading...</h1>;

  if (isLoggedIn) return <AuthenticatedApp />;

  return <UnauthenticatedApp />;
}

export default App;
