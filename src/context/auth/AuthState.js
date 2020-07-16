import React, { useReducer } from 'react';
import AuthContext from './AuthContext';
import authReducer from './AuthReducer';

import { LOGIN_SUCCESS, LOGIN_FAIL } from '../types';

const AuthState = (props) => {
  const initialState = {
    data: localStorage.getItem('data'),
    error: null,
    authenticated: false,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Login User using fetch to call API
  const login = async (formData) => {
    try {
      const res = await fetch(' https://admin.barikoi.xyz:8090/auth/login', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();

      if (data.success == true) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: data,
        });
      } else {
        dispatch({
          type: LOGIN_FAIL,
          payload: data,
        });
      }

      //console.log(data);
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.message,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        data: state.data,
        authenticated: state.authenticated,
        error: state.error,
        login,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
