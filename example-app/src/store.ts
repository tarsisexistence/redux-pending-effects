import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createPendingMiddleware } from 'redux-pending-effects';
import createSagaMiddleware from '@redux-saga/core';

import { rootReducer as reducer } from './reducers/rootReducer';
import { rootSaga } from './sagas';

const rpeMiddlewares = createPendingMiddleware({
  promiseMiddleware: true,
  toolkitMiddleware: true
});
export const sagaMiddleware = createSagaMiddleware();
export const defaultMiddlewares = getDefaultMiddleware({
  serializableCheck: false
});
export const middleware = [
  ...rpeMiddlewares,
  sagaMiddleware,
  ...defaultMiddlewares
];

export const store = configureStore({ reducer, middleware });

sagaMiddleware.run(rootSaga);
