import * as types from './types.js';
import axios from 'axios';

export function updateCurrentVolunteer(currentVolunteer) {
  return { type: types.CURRENT_VOLUNTEER, currentVolunteer };
}

export function updateVolunteerStatus(role) {
  return { type: types.VOLUNTEER_STATUS, role};
}
