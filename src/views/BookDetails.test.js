import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act, cleanup, render, waitForElement } from '@testing-library/react';
import axiosMock from 'axios';
import BookDetails from './BookDetails';
import { AuthContext } from '../contexts/AuthContext';

jest.mock('axios');
afterEach(cleanup);

describe('BookDetails', () => {
  const user = {
    id: 1,
    first_name: 'Test',
    last_name: 'User',
    email: 'test@user.com'
  };

  test('it displays the book details and borrow button if available book exists', async () => {
    const data = {
      data: {
        book_id: 1,
        isAvailable: true,
        title: 'Harry Potter',
        author: 'J.K. Rowling',
        description: 'Yer a book, Harry',
        user: user,
        borrowed_user: null
      }
    };
    await act(async () => {
      axiosMock.get.mockResolvedValueOnce(data);
      const { getByTestId, getByText, queryByTestId } = render(
        <AuthContext.Provider value={{ user: user }}>
          <Router>
            <BookDetails />
          </Router>
        </AuthContext.Provider>
      );
      const bookDetails = await waitForElement(() => getByTestId('BookDetails'));
      const borrowButton = await waitForElement(() => getByText('Borrow'));

      expect(bookDetails).toBeInTheDocument();
      expect(bookDetails).toHaveTextContent('Harry Potter');
      expect(bookDetails).toHaveTextContent('J.K. Rowling');
      expect(bookDetails).toHaveTextContent('Yer a book, Harry');
      expect(borrowButton).toBeInTheDocument();
      expect(queryByTestId('ReturnButton')).toBeNull();
    });
  });

  test('it displays the book details and return button if book is not available and user is borrowing', async () => {
    const data = {
      data: {
        book_id: 1,
        isAvailable: false,
        title: 'Flour Water Salt Yeast',
        author: 'Ken Forkish',
        description: 'A book about bread',
        borrowed_user: user,
        user: user
      }
    };
    await act(async () => {
      axiosMock.get.mockResolvedValueOnce(data);
      const { getByTestId, getByText, queryByTestId } = render(
        <AuthContext.Provider value={{ user: user }}>
          <Router>
            <BookDetails />
          </Router>
        </AuthContext.Provider>
      );
      const bookDetails = await waitForElement(() => getByTestId('BookDetails'));
      const returnButton = await waitForElement(() => getByText('Return'));

      expect(bookDetails).toBeInTheDocument();
      expect(bookDetails).toHaveTextContent('Flour Water Salt Yeast');
      expect(bookDetails).toHaveTextContent('Ken Forkish');
      expect(bookDetails).toHaveTextContent('A book about bread');
      expect(bookDetails).toHaveTextContent('Borrowed by: Test User');
      expect(queryByTestId('BorrowButton')).toBeNull();
      expect(returnButton).toBeInTheDocument();
    });
  });

  test('it displays the book details and no return if book is not available and user is not borrowing', async () => {
    const borrowingUser = {
      id: 2,
      first_name: 'Borrowing',
      last_name: 'User',
      email: 'borrowing@user.com'
    };
    const data = {
      data: {
        book_id: 1,
        isAvailable: false,
        title: 'Not Available',
        author: 'N. Avail',
        description: 'This book is not available',
        borrowed_user: borrowingUser,
        user: user
      }
    };
    await act(async () => {
      axiosMock.get.mockResolvedValueOnce(data);
      const { getByTestId, queryByTestId} = render(
        <AuthContext.Provider value={{ user: user }}>
          <Router>
            <BookDetails />
          </Router>
        </AuthContext.Provider>
      );
      const bookDetails = await waitForElement(() => getByTestId('BookDetails'));

      expect(bookDetails).toBeInTheDocument();
      expect(bookDetails).toHaveTextContent('Not Available');
      expect(bookDetails).toHaveTextContent('N. Avail');
      expect(bookDetails).toHaveTextContent('This book is not available');
      expect(bookDetails).toHaveTextContent('Borrowed by: Borrowing User');
      expect(queryByTestId('BorrowButton')).toBeNull();
      expect(queryByTestId('ReturnButton')).toBeNull();
    });
  });

  test('it displays Loading when book has not been loaded', async () => {
    await act(async () => {
      axiosMock.get.mockResolvedValueOnce({ data: null });
      const { getByTestId } = render(
        <AuthContext.Provider value={{ user: user }}>
          <Router>
            <BookDetails />
          </Router>
        </AuthContext.Provider>
      );
      const loading = await waitForElement(() => getByTestId('Loading'));

      expect(loading).toBeInTheDocument();
      expect(loading).toHaveTextContent('Loading...');
    });
  });
});
