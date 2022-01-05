import { AnyAction, Dispatch, MiddlewareAPI } from 'redux';

import { patchEffect } from '../store/actions';
import { effectTypes } from '../helpers/const';

export const pendingToolkitMiddleware =
  ({ dispatch }: MiddlewareAPI) =>
  (next: Dispatch) =>
  (action: AnyAction): AnyAction => {
    const requestId = action?.meta?.requestId;

    if (requestId !== undefined) {
      dispatch(
        patchEffect({
          effectId: requestId,
          effectType: effectTypes.toolkit,
          actionType: action.type
        })
      );
    }

    return next(action);
  };
