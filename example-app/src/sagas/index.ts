import { all } from '@redux-saga/core/effects';

import { astronomyPictureWatcher } from './astronomyPictureSagas';

export function* rootSaga() {
  yield all([
    astronomyPictureWatcher()
  ])
}
