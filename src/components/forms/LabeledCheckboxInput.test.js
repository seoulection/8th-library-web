import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import LabeledCheckboxInput from './LabeledCheckboxInput';
import { AuthProvider } from '../../contexts/AuthContext';

afterEach(cleanup);

describe('LabeledCheckboxInput', () => {
  test('renders a labeled checkbox input with props label text and unchecked as default', () => {
    const { getByRole, getByTestId } = render(
      <AuthProvider>
        <LabeledCheckboxInput label="This is a checkbox" checked={false} onChange={jest.fn()} />
      </AuthProvider>
    );
    const labeledInput = getByTestId('LabeledCheckboxInput');
    const input = getByRole('checkbox');

    expect(labeledInput).toBeInTheDocument();
    expect(labeledInput).toHaveTextContent('This is a checkbox');
    expect(input).toBeInTheDocument();
    expect(input.checked).toBe(false);
  });

  test('calls mock function on input change', () => {
    const handleOnChange = jest.fn();
    const { getByRole } = render(
      <AuthProvider>
        <LabeledCheckboxInput label="This is a checkbox" checked={false} onChange={handleOnChange} />
      </AuthProvider>
    );
    const input = getByRole('checkbox');
    fireEvent.click(input);

    expect(handleOnChange).toHaveBeenCalledTimes(1);
  });
});
