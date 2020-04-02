import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act, cleanup, render, waitForElement } from '@testing-library/react';
import axiosMock from 'axios';
import UserDashboard from './UserDashboard';
import { AuthContext } from '../contexts/AuthContext';

jest.mock('axios');
afterEach(cleanup);

describe('UserDashboard', () => {
  const data = {
    data: {
      user: {
        id: 1,
        first_name: 'Owner',
        last_name: 'McOwnerson',
        email: 'owner@mcownerson.com',
        owned_books: [
          {
            id: 1,
            title: 'Book 1',
            author: 'Author 1',
            description: 'Description 1',
            image: null,
            isAvailable: true
          },
          {
            id: 4,
            title: 'Book 4',
            author: 'Author 4',
            description: 'Description 4',
            image: null,
            isAvailable: true
          }
        ],
        borrowed_books: [
          {
            id: 2,
            title: 'Book 2',
            author: 'Author 2',
            description: 'Description 2',
            image: null,
            isAvailable: false,
            borrower: {
              id: 1
            }
          },
        ]
      }
    }
  };

  test('renders the User Dashboard page', async () => {
    await act(async () => {
      await axiosMock.get.mockResolvedValueOnce(data);
      const { getByTestId } = render(
        <AuthContext.Provider value={{ user: { id: 1 } }}>
          <Router>
            <UserDashboard />
          </Router>
        </AuthContext.Provider>
      );
      const dashboard = await waitForElement(() => getByTestId('UserDashboard'));

      expect(dashboard).toBeInTheDocument();
    });
  });

  test('renders all of the books', async () => {
    await act(async () => {
      axiosMock.get.mockResolvedValueOnce(data);
      const { getAllByTestId } = render(
        <AuthContext.Provider value={{ user: { id: 1 } }}>
          <Router>
            <UserDashboard />
          </Router>
        </AuthContext.Provider>
      );
      const books = await waitForElement(() => getAllByTestId('Book'));

      expect(books.length).toEqual(3);
    });
  });
});
