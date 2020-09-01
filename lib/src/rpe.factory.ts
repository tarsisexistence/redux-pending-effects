import { Middleware } from 'redux';

import { ignoreActionsMiddleware } from './middlewares/ignoreActions.middleware';
import { pendingPromiseMiddleware } from './middlewares/promise.middleware';
import { pendingToolkitMiddleware } from './middlewares/toolkit.middleware';

const defaultFactoryOptions = {
  promiseMiddleware: false,
  toolkitMiddleware: false,
  ignoredActions: []
};

export const rpeFactory = (
  options: RPE.FactoryOptions = defaultFactoryOptions
): Middleware[] => {
  const { promiseMiddleware, toolkitMiddleware, ignoredActions } = options;
  const middlewares = [];

  if (ignoredActions?.length) {
    middlewares.push(ignoreActionsMiddleware(ignoredActions));
  }

  if (promiseMiddleware) {
    middlewares.push(pendingPromiseMiddleware);
  }

  if (toolkitMiddleware) {
    middlewares.push(pendingToolkitMiddleware);
  }

  return middlewares;
};
