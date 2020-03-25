import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { cleanup, render, waitForElement } from '@testing-library/react';
import BookList from './BookList';
import { AuthProvider } from '../../contexts/AuthContext';

afterEach(cleanup);

describe('BookList', () => {
  test('renders a book list', async () => {
    const books = [
      {
        id: 1,
        title: 'Book',
        author: 'One',
        image: null,
        borrowed_user: null,
        isAvailable: true
      },
      {
        id: 2,
        title: 'Book',
        author: 'Two',
        image: null,
        borrowed_user: null,
        isAvailable: true
      },
      {
        id: 3,
        title: 'Book',
        author: 'Three',
        image: null,
        borrowed_user: null,
        isAvailable: true
      }
    ];
    const { getAllByRole } = render(
      <AuthProvider>
        <Router>
          <BookList books={books} />
        </Router>
      </AuthProvider>
    );

    const bookList = await waitForElement(() => getAllByRole('listitem'));

    expect(bookList).toHaveLength(3);
  });

  test('renders an empty list if no props are passed in', async () => {
    const { queryAllByRole } = render(
      <AuthProvider>
        <Router>
          <BookList />
        </Router>
      </AuthProvider>
    );

    const bookList = await waitForElement(() => queryAllByRole('listitem'));

    expect(bookList).toEqual([]);
  });
});
