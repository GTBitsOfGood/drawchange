import { combineReducers } from 'redux';
import { reducer } from 'react-redux-sweetalert';
import { routerReducer as router } from 'react-router-redux';

import auth from './auth';

import {
  combineForms,
  createForms // optional
} from 'react-redux-form';

const initialUserState = {
  email: '',
  password: '',
  first_name: '',
  last_name: '',
  phone_number: '',
  date_of_birth: Date.now(),
  street_address: '',
  city: '',
  state: '',
  zip_code: '',
};

export default combineReducers({
  auth,
  myForms: combineForms({
    user: initialUserState,
  }, 'myForms'),
  sweetalert: reducer,
  router
});