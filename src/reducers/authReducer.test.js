import reducer from './authReducer';
import { SIGN_IN, SIGN_OUT } from '../actions/types';

describe('auth reducer', () => {
  test('it should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      isSignedIn: null,
      userId: null
    });
  });

  test('it should handle SIGN_IN', () => {
    expect(
      reducer({}, {
        type: SIGN_IN,
        payload: 20
      })
    ).toEqual({
      isSignedIn: true,
      userId: 20
    })
  });

  test('it should handle SIGN_OUT', () => {
    expect(
      reducer({}, {
        type: SIGN_OUT
      })
    ).toEqual({
      isSignedIn: false,
      userId: null
    })
  });
});
