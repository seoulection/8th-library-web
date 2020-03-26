import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import Button from './Button';
import { AuthProvider } from '../../contexts/AuthContext';

afterEach(cleanup);

describe('Button', () => {
  test('renders a button with props text', () => {
    const { getByRole } = render(
      <AuthProvider>
        <Button buttonText="Button Name" />
      </AuthProvider>
    );
    const button = getByRole('button');

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Button Name');
  });

  test('calls callback function on button click', () => {
    const mockFunction = jest.fn();
    const { getByRole } = render(
      <AuthProvider>
        <Button onButtonClick={mockFunction} />
      </AuthProvider>
    );
    fireEvent.click(getByRole('button'));

    expect(mockFunction).toHaveBeenCalledTimes(1);
  });
});
