import * as types from './types.js';
import axios from 'axios';

export function updateCurrentVolunteer(currentVolunteer) {
  return { type: types.CURRENT_VOLUNTEER, currentVolunteer };
}

export function updateVolunteerStatus(role) {
  return { type: types.VOLUNTEER_STATUS, role};
}

export function updateVolunteerArray(volunteers) {
  return { type: types.UPDATE_VOLUNTEER_ARRAY, volunteers};
}

export function onLoadVolunteers() {
  return(dispatch) => {
    axios.get('/api/users')
            .then(({data}) => {
              console.log(data.users);
              dispatch(updateVolunteerArray(data.users));
            });
  };
}