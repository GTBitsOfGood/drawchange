import * as types from '../actions/types';

const initialState = {
  pending: [],
  newest: [],
  all: [],
  current_volunteer: undefined,
  filter: {
    language: "",
    skills: "no_filter",
    birthday: {
      month: 0,
      day: 0
    },
    availability: {
      set: false,
      weekday_mornings: false,
      weekday_afternoons: false,
      weekday_evenings: false,
      weekend_mornings: false,
      weekend_afternoons: false,
      weekend_evenings: false
    },
    criminal_history: {
      no_felony: false,
      no_sexual_violent: false,
      no_drugs: false,
      no_driving: false
    }
  },
  selected_volunteers: []
};

export default function volunteers(state = initialState, action) {
  switch(action.type) {
    case types.LOAD_ALL_VOLUNTEERS:
      return Object.assign({}, state, { all:(action.all ? action.all : []) });
    case types.LOAD_PENDING_VOLUNTEERS:
      return Object.assign({}, state, {pending: action.pending});
    case types.LOAD_NEWEST_VOLUNTEERS:
      return Object.assign({}, state, { newest: action.newest });
    case types.LOAD_DENIED_VOLUNTEERS:
      return Object.assign({}, state, {denied: action.denied});
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

    case types.DENY_PENDING_VOLUNTEER:
      const volunteerToDeny = state.pending.find(item => item._id === action.id);
      const newPendingD = state.pending.slice();
      newPendingD.splice(state.pending.indexOf(volunteerToDeny), 1);
      const newAllD = state.all.slice();
      newAllD.push(volunteerToDeny);
      const newNewestD = state.newest.slice();
      newNewestD.unshift(volunteerToDeny);
      return Object.assign({}, state, { pending: newPendingD, all: newAllD, newest: newNewestD });

    case types.UPDATE_VOLUNTEER_FILTER:
      const newFilterObject = Object.assign({}, state.filter, action.filter);
      return Object.assign({}, state, {filter: newFilterObject});
    case types.ADD_SELECTED_VOLUNTEER:
      const volunteerToAddAll = state.all.find(item => item._id === action.id);
      const volunteerToAddPending = state.pending.find(item => item._id === action.id);
      const selected_volunteers_cpy = state.selected_volunteers.slice();
      const volunteerToAdd = volunteerToAddAll || volunteerToAddPending;
      selected_volunteers_cpy.push({
          _id: volunteerToAdd._id,
          email: volunteerToAdd.bio.email
        });
      return Object.assign({}, state, {selected_volunteers: selected_volunteers_cpy});
    case types.REMOVE_SELECTED_VOLUNTEER:
      const selected_volunteers_new = state.selected_volunteers.filter(volunteer => volunteer._id !== action.id);
      return Object.assign({}, state, {selected_volunteers: selected_volunteers_new});

    default:
      return state;
  }
}
