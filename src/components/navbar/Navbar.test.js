import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { cleanup, render, fireEvent } from '@testing-library/react';
import Navbar from './Navbar';
import { AuthProvider } from '../../contexts/AuthContext';
import renderWithRouter from '../../setupTests';

afterEach(cleanup);

describe('Navbar', () => {
  test('it displays the Navbar with the brand', () => {
    const { getByTestId } = render(
      <AuthProvider>
        <Router>
          <Navbar />
        </Router>
      </AuthProvider>
    );
    const navbar = getByTestId('Navbar');

    expect(navbar).toBeInTheDocument();
    expect(navbar).toHaveTextContent('8th Library');
  });

  test('it renders the links', () => {
    const { getAllByRole } = render(
      <AuthProvider>
        <Router>
          <Navbar />
        </Router>
      </AuthProvider>
    );

    const navbarLinks = getAllByRole('listitem');
    expect(navbarLinks).toHaveLength(4);
  });

  test('it goes to the listings route when clicking listing link', () => {
    const { history, getByText } = renderWithRouter(
      <AuthProvider>
        <Navbar />
      </AuthProvider>
    );

    const listingsLink = getByText('Listings');
    fireEvent.click(listingsLink);

    expect(history.location.pathname).toEqual('/');
  });

  test('it goes to the add book route when clicking add book link', () => {
    const { history, getByText } = renderWithRouter(
      <AuthProvider>
        <Navbar />
      </AuthProvider>
    );

    const addBookLink = getByText('Add Book');
    fireEvent.click(addBookLink);

    expect(history.location.pathname).toEqual('/books/add');
  });

  test('it goes to the user dashboard route when clicking dashboard link', () => {
    const { history, getByText } = renderWithRouter(
      <AuthProvider>
        <Navbar />
      </AuthProvider>
    );

    const dashboardLink = getByText('Dashboard');
    fireEvent.click(dashboardLink);

    expect(history.location.pathname).toEqual('/dashboard');
  });

  test('it has a text input for filtering books', () => {
    const { getByRole } = renderWithRouter(
      <AuthProvider>
        <Navbar />
      </AuthProvider>,
      { route: '/' }
    );
    const filterInput = getByRole('textbox');

    expect(filterInput).toBeInTheDocument();
  });

  test('it has a checkbox input for toggling books', () => {
    const { getByRole } = renderWithRouter(
      <AuthProvider>
        <Navbar />
      </AuthProvider>,
      { route: '/' }
    );
    const checkbox = getByRole('checkbox');

    expect(checkbox).toBeInTheDocument();
  });

  test('inputs call mock functions on change', () => {
    const mockOnChange = jest.fn();
    const { getByRole } = renderWithRouter(
      <AuthProvider>
        <Navbar
          onCheckboxChange={mockOnChange}
          onFilterChange={mockOnChange}
        />
      </AuthProvider>,
      { route: '/' }
    );
    const filterInput = getByRole('textbox');
    const checkbox = getByRole('checkbox');
    fireEvent.change(filterInput, { target: { value: 'Hello' } });
    fireEvent.click(checkbox);

    expect(mockOnChange).toHaveBeenCalledTimes(2);
  });
});
