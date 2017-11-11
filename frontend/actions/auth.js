// NPM Import
import axios from 'axios';

// Action Creators
import * as types from './types';

/*
 * Action Creators for controlled input fields
 */
export function firstNameChange(first_name) {
  return { type: types.FIRST_NAME_CHANGE, first_name };
}
export function lastNameChange(last_name) {
  return { type: types.LAST_NAME_CHANGE, last_name };
}
export function emailChange(email) {
  return { type: types.EMAIL_CHANGE, email };
}
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


/*
 * Login Async Action Creator
 */
export function login() {
  return (dispatch, getState) => { // using Thunks
    const { email, password } = getState().auth;
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
    const { email, password, first_name, last_name, date_of_birth,
            street_address, city, state, zip_code, phone_number } = getState().auth;
    axios.post('/api/users', { email, password, first_name, last_name,
      date_of_birth, street_address, city, state, zip_code, phone_number })
      .then(resp => {
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