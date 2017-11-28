import * as types from './types.js';
import axios from 'axios';

export function updateCurrentEvent(currentEvent) {
  return { type: types.CURRENT_EVENT, currentEvent };
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

export function loadAllEvents() {
  return dispatch => {
    axios.get('/api/events')
      .then(({ data }) => {
        dispatch(allEvents(data.events));
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