import React from 'react';
import { cleanup, render } from '@testing-library/react';
import Login from './Login';
import { AuthProvider } from '../contexts/AuthContext';

afterEach(cleanup);

describe('Login', () => {
  test('it renders the login view', () => {
    const { getByRole, getByText } = render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );

    const login = getByText('8th Library');
    const googleButton = getByRole('button');

    expect(login).toBeInTheDocument();
    expect(googleButton).toBeInTheDocument();
  });
});
