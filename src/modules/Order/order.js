import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import {
    addressListSuccess,
    routeRequest,
    routeSuccess,
    routeFailure,
    newOrderRequest
} from "./actions";

const addressList = handleActions(
    {
        [addressListSuccess]: (state, action) => action.payload.addresses
    },
    null
);

const route = handleActions(
    {
        [routeRequest]: state => null,
        [routeSuccess]: (state, action) => action.payload,
        [routeFailure]: state => null,
        [newOrderRequest]: state => null
    },
    null
);

const order = handleActions(
    {
        [routeRequest]: state => false,
        [routeSuccess]: state => true,
        [routeFailure]: state => false,
        [newOrderRequest]: state => false
    },
    false
);

export const getAddressList = state => state.order.addressList;
export const getRoute = state => state.order.route;
export const getOrder = state => state.order.order;

export default combineReducers({
    addressList,
    route,
    order
});
