import React from 'react';
import { cleanup, render } from '@testing-library/react';
import LabeledImageInput from './LabeledImageInput';
import { AuthProvider } from '../../contexts/AuthContext';

afterEach(cleanup);

describe('LabeledImageInput', () => {
  test('renders a labeled image input with props label text', () => {
    const { getByTestId } = render(
      <AuthProvider>
        <LabeledImageInput label="Labeled Image Input" value={null} />
      </AuthProvider>
    );
    const labeledInput = getByTestId('LabeledImageInput');

    expect(labeledInput).toBeInTheDocument();
    expect(labeledInput).toHaveTextContent('Labeled Image Input');
  });
});
