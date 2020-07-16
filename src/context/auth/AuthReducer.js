import { LOGIN_SUCCESS, LOGIN_FAIL } from '../types';

export default (state, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem('data', action.payload.data);
      return {
        ...state,
        ...action.payload,
        authenticated: true,
        error: null,
      };
    case LOGIN_FAIL:
      localStorage.removeItem('data');
      return {
        ...state,
        data: null,
        error: action.payload.message,
      };

    default:
      return state;
  }
};
