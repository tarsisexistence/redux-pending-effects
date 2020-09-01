import { AnyAction } from 'redux';
import { put } from '@redux-saga/core/effects';

import { patchEffect } from '../store/actions';
import { nanoid } from '../helpers/nanoid.utils';

// not implemented
// export const pendingSagaMiddleware =  null;

export const trackWorker = <T = any>(
  worker: (action: AnyAction) => any
): ((action: AnyAction) => Generator<any>) =>
  function* wrapper(action: AnyAction) {
    const effectId = nanoid();
    const { type: actionType } = action;

    if (!put) {
      throw new Error('trackWorker expects installed redux-saga lib.');
    }

    try {
      yield put(patchEffect({ effectId, actionType }));
      yield* worker(action);
      yield put(patchEffect({ effectId, actionType }));
    } catch (e) {
      yield put(patchEffect({ effectId, actionType }));
    }
  };
