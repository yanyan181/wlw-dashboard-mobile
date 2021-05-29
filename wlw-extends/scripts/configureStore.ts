import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";

import { State, rootReducer } from "./reducers";

const logger = createLogger();

export function configureStore(initialState: State) {
  const middlewares = [logger];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  //TODO:引数怪しいからちゃんと書こうね！
  const store = createStore(rootReducer, middlewareEnhancer);
  return store;
}
