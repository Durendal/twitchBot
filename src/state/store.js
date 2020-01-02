import { applyMiddleware, createStore, compose } from 'redux';
import logger from 'redux-logger';
import { default as thunk } from 'redux-thunk';
import { combineReducers } from 'redux';
import * as reducers from './ducks';

const rootReducer = combineReducers({
  ...reducers,
});

const store = createStore(
  rootReducer,
  {},
  compose(applyMiddleware(thunk)),
);

export default store;
