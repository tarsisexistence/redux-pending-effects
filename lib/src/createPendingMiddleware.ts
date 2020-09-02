import { Middleware } from 'redux';

import { getIgnoreActionTypesMiddleware } from './middlewares/ignoreActionTypes.middleware';
import { pendingPromiseMiddleware } from './middlewares/promise.middleware';
import { pendingToolkitMiddleware } from './middlewares/toolkit.middleware';

const defaultConfigureOptions = {
  promiseMiddleware: false,
  toolkitMiddleware: false,
  ignoredActionTypes: []
};

export const createPendingMiddleware = (
  options: RPE.ConfigureOptions = defaultConfigureOptions
): Middleware[] => {
  const { promiseMiddleware, toolkitMiddleware, ignoredActionTypes } = options;
  const middlewares = [];

  if (ignoredActionTypes?.length) {
    middlewares.push(getIgnoreActionTypesMiddleware(ignoredActionTypes));
  }

  if (promiseMiddleware) {
    middlewares.push(pendingPromiseMiddleware);
  }

  if (toolkitMiddleware) {
    middlewares.push(pendingToolkitMiddleware);
  }

  return middlewares;
};
