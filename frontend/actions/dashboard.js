// NPM Import
import axios from 'axios';

// Action Creators
import * as types from './types';

export function onLoad() {
  return dispatch => {
    axios.get('/api/users?type=pending')
      .then(({ data }) => {
        dispatch(loadPendingVolunteers(data.users));
      });
    axios.get('/api/users?type=new')
      .then(({ data }) => {
        dispatch(loadNewVolunteers(data.users));
      });
    axios.get('/api/events?type=new')
      .then(({ data }) => {
        dispatch(loadNewEvents(data.events));
      });
  };
}

function loadPendingVolunteers(pending) {
  return {
    type: types.LOAD_PENDING_VOLUNTEERS,
    pending
  };
}

function loadNewVolunteers(newest) {
  return {
    type: types.LOAD_NEWEST_VOLUNTEERS,
    newest
  };
}

function loadNewEvents(newest) {
  return {
    type: types.LOAD_NEWEST_EVENTS,
    newest
  };
}