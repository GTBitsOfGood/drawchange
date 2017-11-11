import { combineReducers } from 'redux';
import { reducer } from 'react-redux-sweetalert';
import { routerReducer as router } from 'react-router-redux';

import auth from './auth';

export default combineReducers({
  auth,
  sweetalert: reducer,
  router
});