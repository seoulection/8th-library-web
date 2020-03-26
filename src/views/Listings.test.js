import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act, cleanup, render, waitForElement } from '@testing-library/react';
import axiosMock from 'axios';
import Listings from './Listings';
import { AuthContext } from '../contexts/AuthContext';

jest.mock('axios');
afterEach(cleanup);

describe('Listings', () => {
  const user = {
    id: 1,
    first_name: 'Owner',
    last_name: 'McOwnerson',
    email: 'owner@mcownerson.com'
  };
  const borrowingUser = {
    id: 2,
    first_name: 'Borrow',
    last_name: 'McBorrowson',
    email: 'borrow@mcborrowson.com'
  };
  const data = {
    data: {
      books: [
        {
          id: 1,
          title: 'Book 1',
          author: 'Author 1',
          description: 'Description 1',
          image: null,
          isAvailable: false,
          user: user,
          borrowed_user: borrowingUser
        },
        {
          id: 2,
          title: 'Book 2',
          author: 'Author 2',
          description: 'Description 2',
          image: null,
          isAvailable: true,
          user: user,
          borrowed_user: null
        },
        {
          id: 3,
          title: 'Book 3',
          author: 'Author 3',
          description: 'Description 3',
          image: null,
          isAvailable: true,
          user: user,
          borrowed_user: null
        },
        {
          id: 4,
          title: 'Book 4',
          author: 'Author 4',
          description: 'Description 4',
          image: null,
          isAvailable: false,
          user: borrowingUser,
          borrowed_user: user
        },
      ]
    }
  };

  test('renders the listings page', async () => {
    await act(async () => {
      axiosMock.get.mockResolvedValueOnce(data);
      const { getByTestId } = render(
        <AuthContext.Provider value={{ user: user }}>
          <Router>
            <Listings />
          </Router>
        </AuthContext.Provider>
      );
      const listings = await waitForElement(() => getByTestId('Listings'));

      expect(listings).toBeInTheDocument();
    });
  });

  test('renders all of the books', async () => {
    await act(async () => {
      axiosMock.get.mockResolvedValueOnce(data);
      const { getAllByRole } = render(
        <AuthContext.Provider value={{ user: user }}>
          <Router>
            <Listings />
          </Router>
        </AuthContext.Provider>
      );
      const books = await waitForElement(() => getAllByRole('listitem'));

      expect(books.length).toEqual(4);
    });
  });
});
