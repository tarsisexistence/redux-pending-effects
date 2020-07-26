import { AnyAction } from 'redux';

import { patentsActionsNames } from '../constants';

const defaultState: Reducers.PatentsReducerState = {
  patentsData: [],
  error: null,
  shouldPatentsUpdate: true
};

export const patentsReducer = (
  state = defaultState,
  action: Actions.PatentsTypes | AnyAction
) => {
  switch (action.type) {
    case patentsActionsNames.FULFILLED:
      return {
        patentsData: (action as Actions.GetPatentsFulFilled).payload,
        error: null,
        shouldPatentsUpdate: false
      };
    case patentsActionsNames.REJECTED:
      return {
        patentsData: [],
        error: `Error: ${(action as Actions.GetPatentsRejected).payload.statusText}`,
        shouldPatentsUpdate: false
      };
    default:
      return state;
  }
};