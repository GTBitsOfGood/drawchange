import * as types from '../actions/types';

const initialState = {
  first_name: "",
  last_name: "",
  role: "",
  email: "",
  street_address: "",
  city: "",
  state: "",
  zip_code: "",
  phone_number: "",
  date_of_birth: "",
  age: "",
  events: [],
  survey_responses: [],
  currentVolunteer: "",
  list: []
};

export default function volunteers(state = initialState, action) {
  switch(action.type) {
    case types.VOLUNTEER_STATUS:
      return Object.assign({}, state, {role: action.role});
    case types.UPDATE_VOLUNTEER_ARRAY:
      return Object.assign({}, state, {list: action.volunteers});
    default:
      return state;
  }
}