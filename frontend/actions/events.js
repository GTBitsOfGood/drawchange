import * as types from './types.js';
import axios from 'axios';
import { push } from 'react-router-redux';

export function updateCurrentEvent(id) {
  return (dispatch, getState) => {
    dispatch(currentEvent(id));
    dispatch(push(`/events/${id}`));
  };
}

function currentEvent(id) {
  return {
    type: types.UPDATE_CURRENT_EVENT,
    id
  };
}

export function updateEventArray(events) {
  return { type: types.UPDATE_EVENT_ARRAY, events};
}

// export function onCreateEvent(createEvent) {
//   return { type: types.CREATE_EVENT, createEvent};
// }

export function loadNewEvents() {
  return dispatch => {
    axios.get('/api/events?type=new')
      .then(({ data }) => {
        dispatch(newEvents(data.events));
      });
  };
}

function newEvents(newest) {
  return {
    type: types.LOAD_NEWEST_EVENTS,
    newest
  };
}

export function loadAllEvents(id) {
  return dispatch => {
    axios.get('/api/events')
      .then(({ data }) => {
        dispatch(allEvents(data.events));
        if (id) dispatch(currentEvent(id));
      });
  };
}

function allEvents(all) {
  return {
    type: types.LOAD_ALL_EVENTS,
    all
  };
}
export function onCreateEvent() {
  return (dispatch, getState) => {
    const { name, description, date, location, max_volunteers, contact } = getState().forms.event;
    axios.post('/api/events', { name, description, date, location, max_volunteers, contact})
      .then(({data}) => console.log(data));
  };
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
  console.log("called");
  return (dispatch, getState) => {
    const volunteers = [];
    const userId = getState().auth.user._id;
    console.log("this is volunteer ID:" + userId);
    volunteers.push(userId); // TODO:volunteers
    const events = [];
    const stringevents = getState().events.current_event._id;
    console.log("this is event ID:" + stringevents);
    events.push(stringevents);
    axios.put(`/api/events/${stringevents}?action=appendVolunteers`, { volunteers, })
        .then(resp => {
          console.log("updated events object, volunteer array");
        });
    axios.put(`/api/users/${userId}?action=appendEvent`, { events, })
        .then(resp => {
          alert("You're signed up!");
        });
  };
}

export function unSignUp() {
  return (dispatch, getState) => {
    const volunteers = [];
    const userId = getState().auth.user._id;
    console.log("this is volunteer ID:" + userId);
    volunteers.push(userId); // TODO:volunteers
    const events = [];
    const stringeventID = getState().events.current_event._id;
    console.log("this is event ID:" + events);
    events.push(stringeventID);
    axios.put(`/api/events/${stringeventID}?action=removeVolunteer`, { volunteers, })
        .then(resp => {
          console.log("updated events object, volunteer array");
        });
    axios.put(`/api/users/${volunteers}?action=removeEvent`, { events, })
        .then(resp => {
          console.log(resp);
          alert("Successfully unregistered!");
        });
  };
}