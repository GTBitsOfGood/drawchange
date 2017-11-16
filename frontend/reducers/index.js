import { combineReducers } from 'redux';
import events from './events.js';
import current from './current.js';
// function rootReducer(state = {name: 'Horizons'}, action) {
//   switch (action.type) {
//     default:
//       return state;
//   }
// }
const rootReducer = combineReducers({
  events,
  current
});

export default rootReducer;
