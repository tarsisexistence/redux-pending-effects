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

type ConfigureOutput = RPE.ConfigureOutput<Middleware, EffectMiddleware>;

export const configurePendingEffects = (
  configureOptions: RPE.ConfigureOptions = defaultConfigureOptions
): ConfigureOutput => {
  const { promise, toolkit, saga, ignoredActionTypes } = configureOptions;
  const configureOutput: ConfigureOutput = {
    middlewares: []
  };

  if (ignoredActionTypes?.length) {
    configureOutput.middlewares.push(
      getIgnoreActionTypesMiddleware(ignoredActionTypes)
    );
  }

  if (promise) {
    configureOutput.middlewares.push(pendingPromiseMiddleware);
  }

  if (toolkit) {
    configureOutput.middlewares.push(pendingToolkitMiddleware);
  }

  if (saga) {
    configureOutput.sagaOptions = {
      effectMiddlewares: [pendingSagaMiddleware]
    };
  }

  return configureOutput;
};
