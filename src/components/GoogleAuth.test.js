import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { GoogleAuth } from './GoogleAuth';
import Root from '../Root';

const SIGNED_IN_STATE = {
  auth: {
    isSignedIn: true,
    userId: 400
  }
}

const SIGNED_OUT_STATE = {
  auth: {
    isSignedIn: false,
    userId: null
  }
}

beforeEach(() => {
  window['gapi'] = {
    load() {
      return null;
    }
  }
});

describe('GoogleAuth', () => {
  test('renders Google Auth with redux, signed out', async () => {
    const { getByRole } = render(
      <Root initialState={SIGNED_OUT_STATE}>
        <GoogleAuth />
      </Root>
    );

    const button = await waitForElement(() => getByRole('button'))

    expect(button).toHaveTextContent('Login');
  });
});
