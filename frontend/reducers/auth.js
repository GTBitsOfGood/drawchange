import * as types from '../actions/types';

const initialState = {
  email: '',
  password: '',
  first_name: '',
  last_name: '',
  address: '',
  state: '',
  city: '',
  zip_code: '',
  date_of_birth: '',
  user: null,
  loginFailed: null,
  registrationFailed: null,
  registrationSuccess: null
};

// Reducer that handles all user authentication
// Note Object.assign is used to keep state immutable
function Auth(state = initialState, action) {
  switch (action.type) {
    case types.FIRST_NAME_CHANGE:
      return Object.assign({}, state, { first_name: action.first_name, registrationFailed: null, registrationSuccess: null });
    case types.LAST_NAME_CHANGE:
      return Object.assign({}, state, { last_name: action.last_name, registrationFailed: null, registrationSuccess: null });
    case types.STATE_CHANGE:
      return Object.assign({}, state, { state: action.state, registrationFailed: null, registrationSuccess: null });
    case types.ADDRESS_CHANGE:
      return Object.assign({}, state, { address: action.address, registrationFailed: null, registrationSuccess: null });
    case types.CITY_CHANGE:
      return Object.assign({}, state, { city: action.city, registrationFailed: null, registrationSuccess: null });
    case types.DATE_OF_BIRTH_CHANGE:
      return Object.assign({}, state, { date_of_birth: action.date_of_birth, registrationFailed: null, registrationSuccess: null });
    case types.ZIP_CODE_CHANGE:
      return Object.assign({}, state, { zip_code: action.zip_code, registrationFailed: null, registrationSuccess: null });
    case types.EMAIL_CHANGE:
      return Object.assign({}, state, { email: action.email, registrationFailed: null, registrationSuccess: null });
    case types.PASSWORD_CHANGE:
      return Object.assign({}, state, { password: action.password, registrationFailed: null, registrationSuccess: null });
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
