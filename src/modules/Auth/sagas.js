import { 
    authRequest, 
    authSuccess, 
    authFailure 
} from "./actions";
import { authUser } from "./api.js";
import { takeLatest, put, call } from "redux-saga/effects";

function* fetchAuthWatcher(action) {
  yield takeLatest(authRequest, fetchAuthFlow);
}

export function* fetchAuthFlow(action) {
    const { email, password } = action.payload;
    try {
        const result = yield call(authUser, email, password);
        if (result.success) {
            yield put(authSuccess());
        } else {
            yield put(authFailure(result.error));
        }
    } catch (er) {
        console.log(er)
    }
}

export default fetchAuthWatcher;

