import { AnyAction, Dispatch, MiddlewareAPI } from 'redux';
import {
  REDUX_PENDING_EFFECTS,
  REDUX_PENDING_EFFECTS_IGNORED_ACTIONS
} from '../helpers/const';

export const ignoreActionsMiddleware = (ignoredActions: string[] = []) => ({
  getState,
  dispatch
}: MiddlewareAPI) => (next: Dispatch) => (action: AnyAction): AnyAction => {
  const state = getState();
  const { isIgnoredActionsSetUp }: RPE.State = state[REDUX_PENDING_EFFECTS];

  if (
    !isIgnoredActionsSetUp &&
    action.type !== REDUX_PENDING_EFFECTS_IGNORED_ACTIONS
  ) {
    dispatch({
      type: REDUX_PENDING_EFFECTS_IGNORED_ACTIONS,
      payload: ignoredActions
    });
  }

  return next(action);
};
