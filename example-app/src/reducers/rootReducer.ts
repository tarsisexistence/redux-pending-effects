import { combineReducers } from 'redux';
import { insertPending } from 'redux-pending-effects';

import { patentsReducer } from './patentsReducer';

export const rootReducer = combineReducers(
  insertPending({
    patentsReducer
  })
);

export type RootState = ReturnType<typeof rootReducer>;