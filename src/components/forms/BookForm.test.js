import React from 'react';
import { act, cleanup, render, waitForElement } from '@testing-library/react';
import axiosMock from 'axios';
import BookForm from './BookForm';
import { AuthProvider } from '../../contexts/AuthContext';

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

afterEach(cleanup);

describe('BookForm', () => {
  test('it has a labeled text input for title', async () => {
    const { findByText } = render(
      <AuthProvider>
        <BookForm />
      </AuthProvider>
    );
    const titleTextInput = await waitForElement(() => findByText('Title'));

    expect(titleTextInput).toBeInTheDocument();
  });

  test('it has a labeled text input for author', async () => {
    const { findByText } = render(
      <AuthProvider>
        <BookForm />
      </AuthProvider>
    );
    const authorTextInput = await waitForElement(() => findByText('Author'));

    expect(authorTextInput).toBeInTheDocument();
  });

  test('it has a labeled text input for description', async () => {
    const { findByText } = render(
      <AuthProvider>
        <BookForm />
      </AuthProvider>
    );
    const descriptionTextInput = await waitForElement(() => findByText('Description'));

    expect(descriptionTextInput).toBeInTheDocument();
  });

  test('it has a labeled file input for image', async () => {
    const { findByText } = render(
      <AuthProvider>
        <BookForm />
      </AuthProvider>
    );

    const imageFileInput = await waitForElement(() => findByText('Image'));

    expect(imageFileInput).toBeInTheDocument();
  });

  test('it has a submit button', async () => {
    const { findByRole } = render(
      <AuthProvider>
        <BookForm />
      </AuthProvider>
    );

    const submitButton = await waitForElement(() => findByRole('button'));

    expect(submitButton).toBeInTheDocument();
  });
});
