import { handleActions } from "redux-actions";
import { load } from "../../localStorage";
import { profileSave } from "./actions";

const profile = handleActions(
    {
        [profileSave]: (_state, action) => {
            if (!action.payload) return null;
            return {
                ..._state,
                ...action.payload
            };
        }
    },
    load("profile")
);

export default profile;

export const getProfile = state => state.profile;
