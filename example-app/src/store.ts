import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { promiseMiddleware, toolkitMiddleware } from 'redux-pending-effects';
import createSagaMiddleware from '@redux-saga/core';
import { rootReducer as reducer } from './reducers/rootReducer';

const defaultMiddlewares = getDefaultMiddleware();
const sagaMiddleware = createSagaMiddleware();
const middleware = [
  promiseMiddleware,
  toolkitMiddleware,
  sagaMiddleware,
  ...defaultMiddlewares
];

export const store = configureStore({ reducer, middleware });