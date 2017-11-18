import * as types from './types.js';
import axios from 'axios';

export function updateCurrentEvent(currentEvent) {
  return { type: types.CURRENT_EVENT, currentEvent };
}

export function updateEventName(name) {
  return { type: types.EVENT_NAME, name };
}

export function updateEventDate(date) {
  return { type: types.EVENT_DATE, date };
}

export function updateEventLocation(location) {
  return { type: types.EVENT_LOCATION, location };
}

export function updateEventDescription(description) {
  return { type: types.EVENT_DESCRIPTION, description };
}

export function updateEventArray(events) {
  return { type: types.UPDATE_EVENT_ARRAY, events};
}

export function onLoadEvent() {
  return(dispatch) => {
    axios.get('/api/events')
        .then(({data}) => {
          dispatch(updateEventArray(data.events));
        });
  };
}

export function onSignUp() {
  return (dispatch, getState) => {
    const volunteer_Id = [];
    volunteer_Id.append(getState.volunteer._id); // TODO:volunteers
    const event_Id = [];
    event_Id.append(getState.currentEvent._id);
    axios.put(`/api/events/:${event_Id}?action=appendVolunteer`, { volunteer_Id, })
        .then(resp => {
          console.log("updated events object, volunteer array");
        });
    axios.put(`/api/users/:${volunteer_Id}?action=appendEvent`, { event_Id, })
        .then(resp => {
          alert("You're signed up!");
        });
  };
}

export function unSignUp() {
  return (dispatch, getState) => {
    const volunteer_Id = [];
    volunteer_Id.append(getState.volunteer._id); // TODO:volunteers
    const event_Id = [];
    axios.put(`/api/events/:${event_Id}?action=removeVolunteer`, { volunteer_Id, })
        .then(resp => {
          console.log("updated events object, volunteer array");
        });
    axios.put(`/api/users/:${volunteer_Id}?action=removeEvent`, { event_Id, })
        .then(resp => {
          alert("Successfully unregistered!");
        });
  };
}