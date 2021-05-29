import * as React from "react";
import { render } from "react-dom";

import { Provider } from "react-redux";

import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";

import { rootReducer } from "../scripts/reducers";
import createSagaMiddleware from "redux-saga";
import execGetCastListSaga from "../scripts/sagas";

import { LoadButton } from "./loadButton";

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();
const middlewares = [logger, sagaMiddleware];
const middlewareEnhancer = applyMiddleware(...middlewares);

//TODO:引数怪しいからちゃんと書こうね！
const store = createStore(rootReducer, middlewareEnhancer);

render(
  <Provider store={store}>
    <div>aaaaaaa</div>
  </Provider>,
  document.querySelector("#load_button")
);

sagaMiddleware.run(execGetCastListSaga);
