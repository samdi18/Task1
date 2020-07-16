import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/auth/AuthContext';
import AlertContext from '../context/alert/alertContext';

const Login = (props) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;
  const { login, authenticated, error } = authContext;

  useEffect(() => {
    if (error !== null) {
      setAlert(error, 'danger');
    }

    if (authenticated) {
      setAlert('Login Successful', 'success');
    }
    // eslint-disable-next-line
  }, [error, authenticated]);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please fill in all fields', 'danger');
      //console.log('no form data');
    } else {
      login({
        email,
        password,
      });
    }

    console.log('it login');
  };

  return (
    <div className='form-container'>
      <h1>Account Login</h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input
            id='email'
            type='email'
            name='email'
            value={email}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            value={password}
            onChange={onChange}
          />
        </div>
        <input
          type='submit'
          value='Login'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Login;
