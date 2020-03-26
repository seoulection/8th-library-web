import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { useAuthContext, AuthProvider } from './AuthContext';

describe('AuthContext', () => {
  function DummyComponent() {
    let isLoggedInText;
    const { isLoggedIn, login, logout, setUser, user } = useAuthContext();

    isLoggedInText = isLoggedIn ? 'Logged in' : 'Logged out';

    const onSetUserClick = () => {
      setUser("dummy user");
    };

    return (
      <div>
        <h1 data-testid="loggedInState">{isLoggedInText}</h1>
        <h1 data-testid="user">{user}</h1>
        <button data-testid="loginButton" onClick={login}>Login</button>
        <button data-testid="logoutButton" onClick={logout}>Logout</button>
        <button data-testid="setUserButton" onClick={onSetUserClick}>Set User</button>
      </div>
    );
  }

  test('it toggles the isLoggedIn state', () => {
    const { getByTestId } = render(
      <AuthProvider>
        <DummyComponent />
      </AuthProvider>
    );
    const loggedInState = getByTestId('loggedInState');
    fireEvent.click(getByTestId('loginButton'));

    expect(loggedInState).toHaveTextContent('Logged in');

    fireEvent.click(getByTestId('logoutButton'));

    expect(loggedInState).toHaveTextContent('Logged out');
  });

  test('it sets the user context to the dummy user', () => {
    const { getByTestId } = render(
      <AuthProvider>
        <DummyComponent />
      </AuthProvider>
    );
    const user = getByTestId('user');
    fireEvent.click(getByTestId('setUserButton'));

    expect(user).toHaveTextContent('dummy user');
  });
});
