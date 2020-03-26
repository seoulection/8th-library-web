import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { cleanup, render } from '@testing-library/react';
import NavbarLinks from './NavbarLinks';
import { AuthProvider } from '../../contexts/AuthContext';

afterEach(cleanup);

describe('NavbarLinks', () => {
  test('it renders the 4 navbar links', () => {
    const { getAllByRole } = render(
      <AuthProvider>
        <Router>
          <NavbarLinks />
        </Router>
      </AuthProvider>
    );

    const navbarLinks = getAllByRole('listitem');

    expect(navbarLinks).toHaveLength(4);
  });
});
