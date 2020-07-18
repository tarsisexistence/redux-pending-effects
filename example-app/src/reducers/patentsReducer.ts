import { AnyAction } from 'redux';

import { Actions } from '../actions/types';
import { patentsActionsNames } from '../constants';
import { Reducers } from './types';

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
        patentsData: action.payload,
        error: null,
        shouldPatentsUpdate: false
      };
    case patentsActionsNames.REJECTED:
      return {
        patentsData: [],
        error: `Error: ${action.payload.status}`,
        shouldPatentsUpdate: false
      };
    default:
      return state;
  }
};