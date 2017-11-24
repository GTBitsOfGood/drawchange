import * as types from '../actions/types';


const initialState = {
  "name": "",
  "date": "",
  "location": "",
  "description": "",
  "contact": "",
  "volunteers": [],
  "max_volunteers": "",
  "list": [],
  "createEvent": "false",
};
export default function events(state = initialState, action) {
  switch(action.type) {
    case types.EVENT_NAME:
      return Object.assign({}, state, { name: action.name });
    case types.EVENT_DATE:
      return Object.assign({}, state, { date: action.date });
    case types.EVENT_LOCATION:
      return Object.assign({}, state, { location: action.location });
    case types.EVENT_DESCRIPTION:
      return Object.assign({}, state, { description: action.description });
    case types.UPDATE_EVENT_ARRAY:
      return Object.assign({}, state, {list: action.events});
    case types.CREATE_EVENT:
      return Object.assign({}, state, {createEvent: action.createEvent});
    default:
      return state;
  }
}
