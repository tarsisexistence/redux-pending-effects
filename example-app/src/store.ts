import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  createPendingMiddleware,
  pendingSagaMiddleware
} from 'redux-pending-effects';
import createSagaMiddleware from '@redux-saga/core';

import { rootReducer as reducer } from './reducers/rootReducer';
import { rootSaga } from './sagas';

const rpeMiddlewares = createPendingMiddleware({
  promiseMiddleware: true,
  toolkitMiddleware: true
});
export const sagaMiddlewareOptions = {
  effectMiddlewares: [pendingSagaMiddleware]
};
export const sagaMiddleware = createSagaMiddleware(sagaMiddlewareOptions);
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
