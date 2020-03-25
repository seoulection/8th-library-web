import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { cleanup, render, fireEvent, waitForElement } from '@testing-library/react';
import Book from './Book';
import { AuthContext, AuthProvider } from '../../contexts/AuthContext';
import renderWithRouter from '../../setupTests';

jest.mock('axios');
afterEach(cleanup);

describe('Book', () => {
  const availableBook = {
    id: 1,
    title: 'Hello',
    author: 'World',
    image: null,
    borrowed_user: null,
    isAvailable: true
  };

  const unavailableBook = {
    id: 2,
    title: 'Unavailable',
    author: 'Book',
    image: null,
    borrowed_user: {
      id: 2,
      first_name: 'Borrowing',
      last_name: 'User'
    },
    isAvailable: false
  };

  test('shows the available book details', async () => {
    const { findByRole, findByText } = render(
      <AuthProvider>
        <Router>
          <Book
            book={availableBook}
          />
        </Router>
      </AuthProvider>
    );

    const titleText = await waitForElement(() => findByText('Hello'));
    const authorText = await waitForElement(() => findByText('World'));
    const image = await waitForElement(() => findByRole('img'));
    const borrowButton = await waitForElement(() => findByText('Borrow'));

    expect(titleText).toBeInTheDocument();
    expect(authorText).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(borrowButton).toBeInTheDocument();
  });

  test('shows the unavailable book details', async () => {
    const user = {
      id: 1
    };
    const { findByRole, findByText } = render(
      <AuthContext.Provider value={{user: user}}>
        <Router>
          <Book
            book={unavailableBook}
          />
        </Router>
      </AuthContext.Provider>
    );

    const titleText = await waitForElement(() => findByText('Unavailable'));
    const authorText = await waitForElement(() => findByText('Book'));
    const image = await waitForElement(() => findByRole('img'));
    const borrowedByText = await waitForElement(() => findByText('Borrowed by: Borrowing User'));

    expect(titleText).toBeInTheDocument();
    expect(authorText).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(borrowedByText).toBeInTheDocument();
  });

  test('shows the return button for current user borrowing the book', async () => {
    const user = {
      id: 2
    };
    const { findByText } = render(
      <AuthContext.Provider value={{user: user}}>
        <Router>
          <Book
            book={unavailableBook}
          />
        </Router>
      </AuthContext.Provider>
    );

    const returnButton = await waitForElement(() => findByText('Return'));

    expect(returnButton).toBeInTheDocument();
  });

  test('clicking on the title link redirects to book details page', async () => {
    const { findByText, history } = renderWithRouter(
      <AuthProvider>
        <Book
          book={availableBook}
        />
      </AuthProvider>
    );
    const titleText = await waitForElement(() => findByText('Hello'));
    fireEvent.click(titleText);

    expect(history.location.pathname).toEqual('/books/1');
  });
});
