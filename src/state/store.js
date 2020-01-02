import { applyMiddleware, createStore, compose } from 'redux';
import logger from 'redux-logger';
import { default as thunk } from 'redux-thunk';
import { combineReducers } from 'redux';
