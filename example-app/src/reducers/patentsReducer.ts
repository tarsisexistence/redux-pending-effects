import { AnyAction } from 'redux';
import { PatentDataShape } from '../services/NasaService';
import { PATENTS } from '../constants/actions';

export interface PatentsReducerState {
  patentsData: PatentDataShape[],
  error: null | string
}

const defaultState: PatentsReducerState = {
  patentsData: [],
  error: null
};

export const patentsReducer = (
  state: PatentsReducerState = defaultState,
  action: AnyAction
) => {
  switch (action.type) {
    case PATENTS.PENDING:
      return defaultState;
    case PATENTS.FULFILLED:
      return {
        patentsData: action.payload,
        error: null
      };
    case PATENTS.REJECTED:
      return {
        patentsData: [],
        error: action.payload.message
      };
    default:
      return state;
  }
};