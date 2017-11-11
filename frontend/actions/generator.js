// Local Imports
import * as types from './types';

/*
 * Authentication Action Generators
 */
export function login(user) {
  return user ? { type: types.LOGIN_SUCCESS, user } : { type: types.LOGIN_FAILED };
}

export function register(user) {
  return user ? { type: types.REGISTRATION_SUCCESS, user } : { type: types.REGISTRATION_FAILED };
}

export function logout() {
  return { type: types.LOGOUT };
}

/*
 * Survey Manager Action Generators
 */
export function surveyUploaded(uploaded) {
  return uploaded ? { type: types.LOAD_UPLOADED_SURVEYS, uploaded } : undefined;
}

// handles updating state after survey loaded
export function surveyLoaded(questions, responder, surveyId) {
  return {
    type: types.SURVEY_LOADED,
    questions,
    responder,
    surveyId
  };
}


export function surveyInspectorLoaded(surveyId, assignees, questions) {
  return {
    type: types.SURVEY_INSPECTOR_LOADED,
    questions,
    assignees,
    surveyId
  };
}

export function usersLoaded(users) {
  return { type: types.USERS_LOADED, users };
}

export function surveyIdsLoaded(ids) {
  return { type: types.SURVEY_IDS_LOADED, ids };
}

export function userAssigned(assignees) {
  return { type: types.USER_ASSIGNED, assignees };
}

/*
 * Survey Action Generators
 */

// handles updating state after survey loaded
export function responseLoaded(answers, surveyId) {
  return {
    type: types.RESPONSE_LOADED,
    answers,
    surveyId
  };
}

export function allResponses(responses) {
  return responses
    ? { type: types.LOAD_RESPONSES, responses }
    : undefined;
}

export function submitResponse(valid) {
  return valid
    ? { type: types.RESPONSE_SUBMITTED_SUCCESS }
    : { type: types.RESPONSE_SUBMITTED_FAILURE };
}

export function assignedSurveys(assigned) {
  return assigned
    ? { type: types.LOAD_ASSIGNED_SURVEYS_SUCCESS, assigned }
    : undefined;
}

export function uploadedSurveys(uploaded) {
  return uploaded
    ? { type: types.LOAD_UPLOADED_SURVEYS, uploaded }
    : undefined;
}

export function newSurvey({ survey }) {
  return survey
    ? { type: types.NEW_SURVEY_CREATED, survey }
    : undefined;
}