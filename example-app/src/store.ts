import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { promiseMiddleware, toolkitMiddleware } from 'redux-pending-effects';
import createSagaMiddleware from '@redux-saga/core';

import { rootReducer as reducer } from './reducers/rootReducer';
import { rootSaga } from './sagas';

const defaultMiddlewares = getDefaultMiddleware({
  serializableCheck: false
});
export const sagaMiddleware = createSagaMiddleware();
export const middleware = [
  promiseMiddleware,
  toolkitMiddleware,
  sagaMiddleware,
  ...defaultMiddlewares
];

export const store = configureStore({ reducer, middleware });

sagaMiddleware.run(rootSaga);
