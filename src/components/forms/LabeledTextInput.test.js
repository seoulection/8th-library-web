import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import LabeledTextInput from './LabeledTextInput';
import { AuthProvider } from '../../contexts/AuthContext';

afterEach(cleanup);

describe('LabeledTextInput', () => {
  test('renders a labeled text input with props label text', () => {
    const { getByTestId } = render(
      <AuthProvider>
        <LabeledTextInput label="Label" value="" />
      </AuthProvider>
    );
    const labeledInput = getByTestId('LabeledTextInput');

    expect(labeledInput).toBeInTheDocument();
    expect(labeledInput).toHaveTextContent('Label');
  });

  test('calls mock function on input change', () => {
    const handleOnChange = jest.fn();
    const { getByTestId } = render(
      <AuthProvider>
        <LabeledTextInput label="Label" value="" onChange={handleOnChange} />
      </AuthProvider>
    );
    const input = getByTestId('TextInput');
    fireEvent.change(input, { target: { value: 'Hello' }});

    expect(handleOnChange).toHaveBeenCalledTimes(1);
  });
});
