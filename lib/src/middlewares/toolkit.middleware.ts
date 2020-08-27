import { AnyAction, Dispatch, MiddlewareAPI } from 'redux';

import { patchEffect } from '../store/actions';

export const pendingToolkitMiddleware = (arrOfIgnoredActions?: string[]) => ({ dispatch }: MiddlewareAPI) => (
  next: Dispatch
) => (action: AnyAction): AnyAction => {
  const requestId = action?.meta?.requestId;
  const shouldCurrentActionBeIgnored = arrOfIgnoredActions?.includes(action.type);

  if (requestId !== undefined && !shouldCurrentActionBeIgnored) {
    dispatch(patchEffect(requestId));
  }

  return next(action);
};
