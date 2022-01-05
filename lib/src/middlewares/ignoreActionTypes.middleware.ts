import { AnyAction, Dispatch, MiddlewareAPI } from 'redux';
import {
  REDUX_PENDING_EFFECTS,
  REDUX_PENDING_EFFECTS_IGNORED_ACTION_TYPES
} from '../helpers/const';

export const getIgnoreActionTypesMiddleware =
  (ignoredActionTypes: string[]) =>
  ({ getState, dispatch }: MiddlewareAPI) =>
  (next: Dispatch) =>
  (action: AnyAction): AnyAction => {
    const state = getState();
    const rpeState: RPE.State = state[REDUX_PENDING_EFFECTS];

    if (
      rpeState.ignoredActionTypes === null &&
      action.type !== REDUX_PENDING_EFFECTS_IGNORED_ACTION_TYPES
    ) {
      dispatch({
        type: REDUX_PENDING_EFFECTS_IGNORED_ACTION_TYPES,
        payload: ignoredActionTypes
      });
    }

    return next(action);
  };
