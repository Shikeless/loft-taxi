import { combineReducers } from "redux";
import { fork } from "redux-saga/effects";
import auth, { sagas as authSagas } from "./Auth";
import profile, { sagas as profileSagas } from "./Profile";
import order, { sagas as orderSagas } from "./Order";
import { reducer as formReducer } from "redux-form";

export default combineReducers({ auth, profile, order, form: formReducer });

export function* rootSaga() {
    yield fork(authSagas);
    yield fork(profileSagas);
    yield fork(orderSagas);
}
