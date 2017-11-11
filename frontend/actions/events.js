import * as types from './types.js';
import axios from 'axios';

export function updateCurrentEvent(eventId) {
  return { type: types.CURRENT_EVENT, eventId };
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

export function onSignUp() {
  return (dispatch, getState) => {
    const volunteer_Id = getState.volunteer._id; // TODO:volunteers
    const event_Id = getState.currentEvent._id;
    axios.put(`/api/events/:${volunteer_Id}?action=updateVolunteer`)
        .then(resp => {
          console.log("updated events object, volunteer array");
        });
    axios.put(`/api/users/:${event_Id}?action=updateEvent`)
        .then(resp => {
          alert("You're signed up!");
        });
  };
}

export function unSignUp() {
  return (dispatch, getState) => {
    const volunteer_Id = getState.volunteer._id; // TODO:volunteers
    const event_Id = getState.currentEvent._id;
    axios.put(`/api/events/:${volunteer_Id}?action=removeVolunteer`)
            .then(resp => {
              console.log("updated events object, volunteer array");
            });
    axios.put(`/api/users/:${event_Id}?action=removeEvent`)
            .then(resp => {
              alert("You're signed up!");
            });
  };
}