import { createAction } from "redux-actions";

export const mapRequest = createAction("MAP/REQUEST");
export const mapSuccess = createAction("MAP/SUCCESS");
export const mapFailure = createAction("MAP/FAILURE");

export const addressListRequest = createAction("ADDRESS_LIST/REQUEST");
export const addressListSuccess = createAction("ADDRESS_LIST/SUCCESS");
export const addressListFailure = createAction("ADDRESS_LIST/FAILURE");

export const routeRequest = createAction("ROUTE/REQUEST");
export const routeSuccess = createAction("ROUTE/SUCCESS");
export const routeFailure = createAction("ROUTE/FAILURE");

export const newOrderRequest = createAction("NEW_ORDER/REQUEST");
export const newOrderSuccess = createAction("NEW_ORDER/SUCCESS");
export const newOrderFailure = createAction("NEW_ORDER/FAILURE");