import { combineReducers } from 'redux';
import { reducer } from 'react-redux-sweetalert';
import { routerReducer as router } from 'react-router-redux';

import auth from './auth';
import myForms from './forms';

export default combineReducers({
  auth,
  myForms,
  sweetalert: reducer,
  router
});