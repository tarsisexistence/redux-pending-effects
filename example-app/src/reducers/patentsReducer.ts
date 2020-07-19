import { AnyAction } from 'redux';

import { patentsActionsNames } from '../constants';

const defaultState: Reducers.PatentsReducerState = {
  patentsData: [],
  error: null,
  shouldPatentsUpdate: true
};

export const patentsReducer = (
  state = defaultState,
  action: Actions.IPatents | AnyAction
) => {
  switch (action.type) {
    case patentsActionsNames.FULFILLED:
      return {
        patentsData: (action as Actions.IGetPatentsFulFilled).payload,
        error: null,
        shouldPatentsUpdate: false
      };
    case patentsActionsNames.REJECTED:
      return {
        patentsData: [],
        error: `Error: ${(action as Actions.IGetPatentsRejected).payload.status}`,
        shouldPatentsUpdate: false
      };
    default:
      return state;
  }
};