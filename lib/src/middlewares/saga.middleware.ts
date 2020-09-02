import { AnyAction } from 'redux';
import { put } from '@redux-saga/core/effects';

import { patchEffect } from '../store/actions';
import { nanoid } from '../helpers/nanoid.utils';
import { effectTypes } from '../helpers/const';

// not implemented
// export const pendingSagaMiddleware =  null;

export const trackWorker = <T = any>(
  worker: (action: AnyAction) => any
): ((action: AnyAction) => Generator<any>) =>
  function* wrapper(action: AnyAction) {
    const effectId = nanoid();
    const { type: actionType } = action;
    const effectType = effectTypes.saga;
    const patchEffectPayload = { effectId, effectType, actionType };

    if (!put) {
      throw new Error('trackWorker expects installed redux-saga lib.');
    }

    try {
      yield put(patchEffect(patchEffectPayload));
      yield* worker(action);
      yield put(patchEffect(patchEffectPayload));
    } catch (e) {
      yield put(patchEffect(patchEffectPayload));
    }
  };
