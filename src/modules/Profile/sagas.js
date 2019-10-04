import { takeEvery, call, fork } from "redux-saga/effects";
import { save } from "../../localStorage";
import { profileSave } from "./actions";

export function* profileFlow(action) {
    try {
        yield call(save, "profile", action.payload);
    } catch (error) {
        console.log(error);
    }
}

function* profileWatcher() {
    yield takeEvery(profileSave, profileFlow);
}

export default function*() {
    yield fork(profileWatcher);
}
