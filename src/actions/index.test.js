import { signIn, signOut } from './index';
import { SIGN_IN, SIGN_OUT } from './types';

describe('signIn', () => {
  it('has the correct type', () => {
    const action = signIn();

    expect(action.type).toEqual(SIGN_IN);
  });

  it('has the correct payload', () => {
    const action = signIn(200);

    expect(action.payload).toEqual(200);
  });
});

describe('signOut', () => {
  it('has the correct type', () => {
    const action = signOut();

    expect(action.type).toEqual(SIGN_OUT);
  });
});
