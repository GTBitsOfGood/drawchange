import * as types from '../actions/types';

const initialState = {
  pending: [],
  newest: [],
  all: [],
  current_volunteer: undefined,
};

export default function volunteers(state = initialState, action) {
  switch(action.type) {
    case types.LOAD_ALL_VOLUNTEERS:
      return Object.assign({}, state, { all: action.all });
    case types.LOAD_PENDING_VOLUNTEERS:
      return Object.assign({}, state, {pending: action.pending});
    case types.LOAD_NEWEST_VOLUNTEERS:
      return Object.assign({}, state, { newest: action.newest });
    case types.UPDATE_CURRENT_VOLUNTEER:
      if (state.all.length === 0) return state;
      const pendingVolunteers = state.pending.find(item => item._id === action.id);
      const allVolunteers = state.all.find(item => item._id === action.id);
      return Object.assign({}, state,
        { current_volunteer: pendingVolunteers || allVolunteers || undefined}
      );
    case types.APPROVE_PENDING_VOLUNTEER:
      const volunteerToApprove = state.pending.find(item => item._id === action.id);
      const newPending = state.pending.slice();
      newPending.splice(state.pending.indexOf(volunteerToApprove), 1);
      const newAll = state.all.slice();
      newAll.push(volunteerToApprove);
      const newNewest = state.newest.slice();
      newNewest.unshift(volunteerToApprove);
      return Object.assign({}, state, { pending: newPending, all: newAll, newest: newNewest });
    default:
      return state;
  }
}