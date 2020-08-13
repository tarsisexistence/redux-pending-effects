import { combineReducers } from 'redux';
import { insertPending } from 'redux-pending-effects';

import { patentsReducer } from './patentsReducer';
import { libraryReducer } from './libraryReducer';
import { astronomyPictureReducer } from './astronomyPictureReducer';
import { marsRoverPhotosReducer } from './marsRoverPhotosReducer';

export const rootReducer = combineReducers(
  insertPending({
    patentsReducer,
    libraryReducer,
    astronomyPictureReducer,
    marsRoverPhotosReducer
  })
);

export type RootState = ReturnType<typeof rootReducer>;
