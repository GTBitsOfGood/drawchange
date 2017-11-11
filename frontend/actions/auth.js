// NPM Import
import axios from 'axios';

// Action Creators
import * as types from './types';
import * as generator from './generator';

// handles registration name field updates
export function nameChange(name) {
  return { type: types.NAME_CHANGE, name };
}

// handles registration username field updates
export function emailChange(email) {
  return { type: types.EMAIL_CHANGE, email };
}

// handles registration password field updates
export function passwordChange(password) {
  return { type: types.PASSWORD_CHANGE, password };
}

// handles login email field updates
export function loginEmailChange(email) {
  return { type: types.LOGIN_EMAIL_CHANGE, email };
}

// handles login password field updates
export function loginPasswordChange(password) {
  return { type: types.LOGIN_PASSWORD_CHANGE, password };
}


// handles login request processing
export function login() {
  return (dispatch, getState) => { // using Thunks
    const { loginUsername, loginPassword } = getState().auth;
    axios.post('/api/login', { username: loginUsername, password: loginPassword })
      .then(resp => {
        dispatch(generator.login(resp.data.user));
      })
      .catch(err => dispatch(generator.login()));
  };
}

// handles registration request processing
export function register() {
  return (dispatch, getState) => {
    const { username, password, name } = getState().auth;
    axios.post('/api/register', { username, password, name })
      .then(resp => {
        dispatch(generator.register(resp.data.user));
      })
      .catch(err => dispatch(generator.register()));
  };
}

// handles logout request
export function logout() {
  return function(dispatch, getState) {
    sessionStorage.removeItem('state');
    axios.get('/api/logout')
      .then(resp => {
        dispatch(generator.logout());
      });
  };
}
