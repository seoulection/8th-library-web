import React from 'react';
import { cleanup, render } from '@testing-library/react';
import Loading from './Loading';

afterEach(cleanup);

describe('Loading', () => {
  test('it renders loading text on the screen', () => {
    const { getByText } = render(<Loading />);

    const loadingText = getByText('Loading...');

    expect(loadingText).toBeInTheDocument();
  });
});
