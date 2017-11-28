import * as types from '../actions/types';

const initialState = {
  newest: [],
};

export default function events(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_NEWEST_EVENTS:
      return Object.assign({}, state, { newest: action.newest });
    default:
      return state;
  }
}