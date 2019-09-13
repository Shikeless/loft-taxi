import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { login, logout} from './actions';

const isAuthorized = handleActions({
    [login]: () => true,
    [logout]: () => false
}, false)

export default combineReducers({ isAuthorized })

export const getIsAuthorized = state => state.user.isAuthorized;