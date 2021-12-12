import { call, put, takeEvery } from '@redux-saga/core/effects';

import { astronomyPictureActionNames } from '../constants';
import { nasaService } from '../services/NasaService';
import {
  getAstronomyPictureDataLoaded,
  getAstronomyPictureDataRejected
} from '../actions';

export function* astronomyPictureWatcher() {
  yield takeEvery(astronomyPictureActionNames.GET, astronomyPictureWorker);
}

export function* astronomyPictureWorker() {
  try {
    const astronomyPictureData: Global.AstronomyPictureDataShape = yield call(
      nasaService.getAstronomyPictureData
    );

    yield put(getAstronomyPictureDataLoaded(astronomyPictureData));
  } catch (e) {
    yield put(
      getAstronomyPictureDataRejected(
        (e as Error).message || (e as Response).statusText
      )
    );
  }
}
