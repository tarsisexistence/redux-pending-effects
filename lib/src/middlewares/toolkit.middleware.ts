import { AnyAction, Dispatch, MiddlewareAPI } from 'redux';

import { patchEffect } from '../store/actions';

export const pendingToolkitMiddleware = ({ dispatch }: MiddlewareAPI) => (
  next: Dispatch
) => (action: AnyAction): AnyAction => {
  const requestId = action?.meta?.requestId;

  if (requestId !== undefined) {
    dispatch(patchEffect({ effectId: requestId, actionType: action.type }));
  }

  return next(action);
};
