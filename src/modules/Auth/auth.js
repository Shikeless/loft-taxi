import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import {
    authRequest,
    authSuccess,
    authFailure,
    logoutRequest
} from "./actions";

const isAuthorized = handleActions(
    {
        [authRequest]: () => false,
        [authSuccess]: () => true,
        [authFailure]: () => false,
        [logoutRequest]: () => false
    },
    false
);

const error = handleActions(
    {
        [authRequest]: () => null,
        [authSuccess]: () => null,
        [authFailure]: (_state, action) => action.payload
    },
    null
);

export default combineReducers({ isAuthorized, error });

export const getIsAuthorized = state => state.auth.isAuthorized;
export const getError = state => state.auth.error;
