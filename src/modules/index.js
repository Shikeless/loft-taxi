import { combineReducers } from 'redux';
import user from './User';

export default combineReducers({ user });

export function* rootSaga() {
    yield console.log('saga')
  }