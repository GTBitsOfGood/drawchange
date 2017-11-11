// NPM Import
import axios from 'axios';

// Action Creators
import * as types from './types';
import * as generator from './generator';

// handles registration name field updates
export function firstNameChange(first_name) {
  return { type: types.FIRST_NAME_CHANGE, first_name };
}

export function lastNameChange(last_name) {
  return { type: types.LAST_NAME_CHANGE, last_name };
}

// handles registration username field updates
export function emailChange(email) {
  return { type: types.EMAIL_CHANGE, email };
}

// handles registration password field updates
export function passwordChange(password) {
  return { type: types.PASSWORD_CHANGE, password };
}

export function phoneNumberChange(phone_number) {
  return { type: types.PHONE_NUMBER_CHANGE, phone_number };
}

export function streetAddressChange(street_address) {
  return { type: types.STREET_ADDRESS_CHANGE, street_address };
}
export function stateChange(state) {
  return { type: types.STATE_CHANGE, state };
}
export function cityChange(city) {
  return { type: types.CITY_CHANGE, city };
}
export function zipCodeChange(zip_code) {
  return { type: types.ZIP_CODE_CHANGE, zip_code };
}
export function dateOfBirthChange(date_of_birth) {
  return { type: types.DATE_OF_BIRTH_CHANGE, date_of_birth };
}


// handles login request processing
export function login() {
  return (dispatch, getState) => { // using Thunks
    const { email, password } = getState().auth;
    axios.post('/api/login', {  email, password })
      .then(resp => {
        dispatch(generator.login(resp.data.user));
      })
      .catch(err => dispatch(generator.login()));
  };
}

// handles registration request processing
export function register() {
  return (dispatch, getState) => {
    const { email, password, first_name, last_name, date_of_birth,
            street_address, city, state, zip_code, phone_number } = getState().auth;
    axios.post('/api/users', { email, password, first_name, last_name,
      date_of_birth, street_address, city, state, zip_code, phone_number })
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
