import * as types from '../actions/types';

const initialState = {
  newest: [],
  all: [],
};

export default function events(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_NEWEST_EVENTS:
      return Object.assign({}, state, { newest: action.newest });
    case types.LOAD_ALL_EVENTS:
      return Object.assign({}, state, { all: action.all });
    default:
      return state;
  }
}