import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { cleanup, render } from '@testing-library/react';
import GoogleLogoutLink from './GoogleLogoutLink';
import { AuthProvider } from '../../contexts/AuthContext';

afterEach(cleanup);

describe('GoogleLogoutLink', () => {
  test('it displays the Navbar with the brand', () => {
    const { getByTestId } = render(
      <AuthProvider>
        <Router>
          <GoogleLogoutLink />
        </Router>
      </AuthProvider>
    );
    const googleLogoutLink = getByTestId('GoogleLogoutLink');

    expect(googleLogoutLink).toBeInTheDocument();
  });
});
