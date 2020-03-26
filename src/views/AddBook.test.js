import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import axiosMock from 'axios';
import { act, cleanup, render, fireEvent } from '@testing-library/react';
import AddBook from './AddBook';
import { AuthContext, AuthProvider } from '../contexts/AuthContext';
import renderWithRouter from '../setupTests';

jest.mock('axios');
afterEach(cleanup);

describe('AddBook', () => {
  test('it displays the Add Book view', () => {
    const { getByTestId } = render(
      <AuthProvider>
        <Router>
          <AddBook />
        </Router>
      </AuthProvider>
    );
    const addBookView = getByTestId('AddBook');

    expect(addBookView).toBeInTheDocument();
    expect(addBookView).toHaveTextContent('Add Book');
  });

  test('it redirects to the book details page upon successful form completion', async () => {
    const user = {
      id: 1
    };
    await act(async () => {
      const { getByRole, getByLabelText, history } = renderWithRouter(
        <AuthContext.Provider value={{ user: user }}>
          <AddBook />
        </AuthContext.Provider>,
        { route: '/books/2' }
      );
      const titleTextInput = getByLabelText('Title');
      const authorTextInput = getByLabelText('Author');
      const descriptionTextInput = getByLabelText('Description');
      const imageInput = getByLabelText('Image');
      const submitButton = getByRole('button');

      axiosMock.post.mockResolvedValueOnce({ data: { id: 2 } });

      fireEvent.change(titleTextInput, { target: { value: 'Great Title' } });
      fireEvent.change(authorTextInput, { target: { value: 'Great Author' } });
      fireEvent.change(descriptionTextInput, { target: { value: 'Great Description' } });
      fireEvent.change(imageInput, { target: { value: '' } });
      fireEvent.click(submitButton);

      expect(history.location.pathname).toEqual('/books/2');
    });
  });

  test('it stays on the add book page upon unsuccessful completion', async () => {
    const user = {
      id: 1
    };
    await act(async () => {
      const { getByRole, getByTestId } = render(
        <AuthContext.Provider value={{ user: user }}>
          <Router>
            <AddBook />
          </Router>
        </AuthContext.Provider>
      );
      const submitButton = getByRole('button');
      fireEvent.click(submitButton);

      const addBookView = getByTestId('AddBook');
      expect(addBookView).toBeInTheDocument();
    });
  });
});
