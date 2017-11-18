import { combineReducers } from 'redux';
import { reducer } from 'react-redux-sweetalert';
import { routerReducer as router } from 'react-router-redux';
import events from './events.js';
import current from './current.js';

import auth from './auth';

export default combineReducers({
  auth,
  events,
  current,
  sweetalert: reducer,
  router,
});