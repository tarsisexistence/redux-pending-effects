import { AnyAction, combineReducers } from 'redux';
import { insertPending } from 'redux-pending-effects';

import { patentsReducer } from './patentsReducer';
import { libraryReducer } from './libraryReducer';
import { astronomyPictureReducer } from './astronomyPictureReducer';
import { marsRoverPhotosReducer } from './marsRoverPhotosReducer';
import { clearStoreActionName } from '../constants/actionNames';

const appReducer = combineReducers(
  insertPending({
    patentsReducer,
    libraryReducer,
    astronomyPictureReducer,
    marsRoverPhotosReducer
  })
);

export type RootState = ReturnType<typeof appReducer>;

export const rootReducer = (state: RootState | undefined, action: AnyAction) => {
  if (action.type === clearStoreActionName) {
    state = undefined;
  }

  return appReducer(state, action);
};
