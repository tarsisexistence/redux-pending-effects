import { combineReducers } from 'redux';
import { insertPending } from 'redux-pending-effects';

import { patentsReducer } from './patentsReducer';
import { libraryReducer } from './libraryReducer';

export const rootReducer = combineReducers(
  insertPending({
    patentsReducer,
    libraryReducer
  })
);

export type RootState = ReturnType<typeof rootReducer>;