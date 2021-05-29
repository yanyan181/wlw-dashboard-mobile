import { CastData } from "./util";

export interface Action {
  type: string;
  payload: any;
}

export interface State {
  isLoading: boolean;
  loadedCast: number;
  castList: any;
  castDetailList: CastData[];
  isStrage: boolean;
}

export const rootReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "STORE_CAST_LIST":
      return {
        isLoading: true,
        loadedCast: 0,
        castList: action.payload.cast,
        castDetailList: [],
        isStrage: localStorage.castDataList ? true : false,
      };
    case "PUSH_CAST_DETAIL":
      return {
        isLoading: true,
        loadedCast: state.loadedCast + 1,
        castList: state.castList,
        castDetailList: [...state.castDetailList, action.payload.castData],
        isStrage: localStorage.castDataList ? true : false,
      };
    case "COMPLETE_GET_CAST_LIST":
      localStorage.castDataList = JSON.stringify(state.castDetailList);
      return {
        isLoading: false,
        loadedCast: 0,
        castList: state.castList,
        castDetailList: [...state.castDetailList],
        isStrage: localStorage.castDataList ? true : false,
      };
  }
  return state;
};
