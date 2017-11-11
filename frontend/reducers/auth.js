import * as types from '../actions/types';

const initialState = {
  email: '',
  password: '',
  name: '',
  loginemail: '',
  loginPassword: '',
  user: null,
  loginFailed: null,
  registrationFailed: null,
  registrationSuccess: null
};

// Reducer that handles all user authentication
// Note Object.assign is used to keep state immutable
function Auth(state = initialState, action) {
  switch (action.type) {
    case types.NAME_CHANGE:
      return Object.assign({}, state, {
        name: action.name,
        registrationFailed: null,
        registrationSuccess: null
      });
    case types.EMAIL_CHANGE:
      return Object.assign({}, state, {
        email: action.email,
        registrationFailed: null,
        registrationSuccess: null
      });
    case types.PASSWORD_CHANGE:
      return Object.assign({}, state, {
        password: action.password,
        registrationFailed: null,
        registrationSuccess: null
      });
    case types.LOGIN_EMAIL_CHANGE:
      return Object.assign({}, state, {
        loginemail: action.email,
        loginFailed: null
      });
    case types.LOGIN_PASSWORD_CHANGE:
      return Object.assign({}, state, {
        loginPassword: action.password,
        loginFailed: null
      });
    case types.LOGIN_SUCCESS:
      return {
        email: '',
        password: '',
        user: action.user,
        loginFailed: false
      };
    case types.LOGIN_FAILED:
      return Object.assign({}, state, {
        password: '',
        loginFailed: true
      });
    case types.REGISTRATION_SUCCESS:
      const loginemail = state.email;
      return Object.assign({}, state, {
        password: '',
        email: '',
        name: '',
        loginemail,
        registrationFailed: false,
        registrationSuccess: true
      });
    case types.REGISTRATION_FAILED:
      return Object.assign({}, state, {
        password: '',
        registrationFailed: true,
        registrationSuccess: false
      });
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default Auth;
