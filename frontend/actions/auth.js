// NPM Import
import axios from 'axios';

// Action Creators
import * as types from './types';

/*
 * Login Async Action Creator
 */
export function login() {
  return (dispatch, getState) => { // using Thunks
    const { email, password } = getState().myForms.user.bio;
    axios.post('/api/login', {  email, password })
      .then(resp => {
        dispatch(loginGenerator(resp.data.user));
      })
      .catch(err => dispatch(loginGenerator()));
  };
}

/*
 * Registration Async Action Creator
 */
export function register() {
  return (dispatch, getState) => {
    // const { email, password, first_name, last_name, date_of_birth,
    //         street_address, city, state, zip_code, phone_number } = getState().myForms.user;
    const { bio, history, availability, skills_interests,
      referral, employment, ice, reference, criminal, permissions} = getState().myForms.user;
    axios.post('/api/users', { bio, history, availability, skills_interests,
      referral, employment, ice, reference, criminal, permissions })
      .then(resp => {
        console.log('inside register action creator');
        console.log(resp);
        dispatch(registerGenerator(resp.data.user));
      })
      .catch(err => dispatch(registerGenerator()));
  };
}

/*
 * Logout Async Action Creator
 */
export function logout() {
  return function(dispatch, getState) {
    sessionStorage.removeItem('state');
    axios.get('/api/logout')
      .then(resp => dispatch(logoutGenerator()));
  };
}


/*
 * Helper Action Creator Generators
 */
function loginGenerator(user) {
  return user ? { type: types.LOGIN_SUCCESS, user } : { type: types.LOGIN_FAILED };
}

function registerGenerator(user) {
  return user ? { type: types.REGISTRATION_SUCCESS, user } : { type: types.REGISTRATION_FAILED };
}

function logoutGenerator() {
  return { type: types.LOGOUT };
}