import React, { useContext, useState } from 'react';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setCurrentUser] = useState(null);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);
  const setUser = user => setCurrentUser(user);

  return (
    <AuthContext.Provider value={{ login, logout, isLoggedIn, setUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => useContext(AuthContext);

export { useAuthContext, AuthProvider, AuthContext };
