import { createReducer } from '@reduxjs/toolkit';

import { libraryActionNames } from '../constants';

const defaultState: Reducers.LibraryReducerState = {
  libraryData: [],
  error: null
};

export const libraryReducer = createReducer(defaultState, {
  [libraryActionNames.FULFILLED]: (
    state,
    { payload }: { payload: Global.LibraryContentDataShape[] }
  ) => ({
    libraryData: payload,
    error: null
  }),
  [libraryActionNames.REJECTED]: (
    state,
    { error }: { error: { message: string } }
  ) => ({
    libraryData: [],
    error: error.message
  })
});
