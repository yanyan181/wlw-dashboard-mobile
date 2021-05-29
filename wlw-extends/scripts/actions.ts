import { Action } from "./reducers";

export const getCastList = (payload: any): Action => ({
  type: "GET_CAST_LIST",
  payload: payload,
});

export const storeCastList = (payload: any): Action => ({
  type: "STORE_CAST_LIST",
  payload: payload,
});

export const pushCastDetail = (payload: any): Action => ({
  type: "PUSH_CAST_DETAIL",
  payload: payload,
});

export const completeGetCastList = (payload: any): Action => ({
  type: "COMPLETE_GET_CAST_LIST",
  payload: payload,
});
