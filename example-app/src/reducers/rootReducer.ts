import { combineReducers } from 'redux';
import { insertPending } from 'redux-pending-effects';

import { patentsReducer } from './patentsReducer';
import { libraryReducer } from './libraryReducer';
import { astronomyPictureReducer } from './astronomyPictureReducer';

export const rootReducer = combineReducers(
  insertPending({
    patentsReducer,
    libraryReducer,
    astronomyPictureReducer
  })
);

export type RootState = ReturnType<typeof rootReducer>;
