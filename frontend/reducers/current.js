import * as types from '../actions/types';


const initialState = {
  "currentEvent": "",
};
export default function events(state = initialState, action) {
  console.log('aksdfaksdjhfa');
  switch(action.type) {
    case types.CURRENT_EVENT:
      return Object.assign({}, state, { currentEvent: action.currentEvent });
    default:
      return state;
  }
}

// export default events;