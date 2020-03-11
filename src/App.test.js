import React from 'react';
import { cleanup, render, waitForElement } from '@testing-library/react';
import axiosMock from 'axios';
import App from './App';

jest.mock('axios');
afterEach(cleanup);

test('renders Hello World header', async () => {
  const data = {
    data: {
      message: 'Hello World!'
    }
  };

  axiosMock.get.mockResolvedValueOnce(data);
  const { getByRole } = render(<App />);

  const headerNode = await waitForElement(() => getByRole('heading'));

  expect(headerNode).toHaveTextContent('Hello World!');
});

test('renders error header', async () => {
  axiosMock.get.mockRejectedValueOnce(new Error('some error'));
  const { getByRole } = render(<App />);

  const headerNode = await waitForElement(() => getByRole('heading'));

  expect(headerNode).toHaveTextContent('some error');
});
