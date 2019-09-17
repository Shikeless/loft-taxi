import { createAction } from 'redux-actions';

export const authRequest = createAction("AUTH/REQUEST");
export const authSuccess = createAction("AUTH/SUCCESS");
export const authFailure = createAction("AUTH/FAILURE");

export const logoutRequest = createAction("AUTH/LOGOUT");
