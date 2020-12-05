import { Middleware } from 'redux';
import { EffectMiddleware } from '@redux-saga/core';

import { getIgnoreActionTypesMiddleware } from './middlewares/ignoreActionTypes.middleware';
import { pendingPromiseMiddleware } from './middlewares/promise.middleware';
import { pendingToolkitMiddleware } from './middlewares/toolkit.middleware';
import { pendingSagaMiddleware } from './middlewares/saga.middleware';

const defaultConfigureOptions = {
  promise: false,
  toolkit: false,
  saga: false,
  ignoredActionTypes: []
};

export const configurePendingEffects = (
  configureOptions: RPE.ConfigureOptions = defaultConfigureOptions
): RPE.ConfigureOutput<Middleware, EffectMiddleware> => {
  const { promise, toolkit, saga, ignoredActionTypes } = configureOptions;
  const middlewares = [];
  const sagaOptions: { effectMiddlewares: EffectMiddleware[] } = {
    effectMiddlewares: []
  };

  if (ignoredActionTypes?.length) {
    middlewares.push(getIgnoreActionTypesMiddleware(ignoredActionTypes));
  }

  if (promise) {
    middlewares.push(pendingPromiseMiddleware);
  }

  if (toolkit) {
    middlewares.push(pendingToolkitMiddleware);
  }

  if (saga) {
    sagaOptions.effectMiddlewares.push(pendingSagaMiddleware);
  }

  return { middlewares, sagaOptions };
};
