import { readFileSync, existsSync } from 'fs';
import { applyMiddleware, createStore, compose } from 'redux';
import logger from 'redux-logger';
import { default as thunk } from 'redux-thunk';
import { combineReducers } from 'redux';
import * as reducers from './ducks';

const rootReducer = combineReducers({
  ...reducers,
});

const persistedState = existsSync(`${__dirname}/state.json`)
  ? JSON.parse(readFileSync(`${__dirname}/state.json`))
  : {};

const store = createStore(
  rootReducer,
  persistedState,
  compose(applyMiddleware(thunk)),
);

export default store;
