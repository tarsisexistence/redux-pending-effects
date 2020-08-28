import { AnyAction, Dispatch, MiddlewareAPI } from 'redux';

import { patchEffect } from '../store/actions';

export const pendingToolkitMiddleware = (ignoredActions: string[] = []) => ({ dispatch }: MiddlewareAPI) => (
  next: Dispatch
) => (action: AnyAction): AnyAction => {
  const requestId = action?.meta?.requestId;
  const shouldIgnore = ignoredActions.includes(action.type);

  if (requestId !== undefined && !shouldIgnore) {
    dispatch(patchEffect(requestId));
  }

  return next(action);
};
