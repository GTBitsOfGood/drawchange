import * as types from '../actions/types';

const initialState = {
  "name": "",
  "date": "",
  "location": "",
  "description": "",
  "contact": "",
  "_id": "",
  "volunteers": [],
  "max_volunteers": ""
};

function events(state = initialState, action) {
  switch(action.type) {
    case types.EVENT_NAME:
      return Object.assign({}, state, { type: action.updateEventName });
    case types.EVENT_DATE:
      return Object.assign({}, state, { type: action.updateEventDate });
    case types.EVENT_LOCATION:
      return Object.assign({}, state, { type: action.updateEventLocation });
    case types.EVENT_DESCRIPTION:
      return Object.assign({}, state, { type: action.updateEventDescription });
    case types.CURRENT_EVENT:
      return Object.assign({}, state, { type: action.updateCurrentEvent });
    default:
      return state;
  }
}

export default events;