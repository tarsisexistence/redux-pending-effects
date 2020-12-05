import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { configurePendingEffects } from 'redux-pending-effects';
import createSagaMiddleware from '@redux-saga/core';

import { rootReducer as reducer } from './reducers/rootReducer';
import { rootSaga } from './sagas';

export const { middlewares, sagaOptions } = configurePendingEffects({
  promise: true,
  toolkit: true,
  saga: true
});
export const sagaMiddleware = createSagaMiddleware(sagaOptions);
export const defaultMiddlewares = getDefaultMiddleware({
  serializableCheck: false
});
export const middleware = [
  ...middlewares,
  sagaMiddleware,
  ...defaultMiddlewares
];

export const store = configureStore({ reducer, middleware });

sagaMiddleware.run(rootSaga);
