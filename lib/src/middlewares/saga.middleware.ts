import { AnyAction } from 'redux';
import { EffectMiddleware } from '@redux-saga/core';
import { put, effectTypes as sagaEffectTypes } from '@redux-saga/core/effects';

import { patchEffect } from '../store/actions';
import { nanoid } from '../helpers/nanoid.utils';
import { effectTypes } from '../helpers/const';

const trackWorker = <T = any>(
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

export const pendingSagaMiddleware: EffectMiddleware = next => effect => {
  if (effect.type === sagaEffectTypes.FORK) {
    const effectArgs = effect.payload.args;
    const sagaWorkerArgIndex = 1;

    effectArgs[sagaWorkerArgIndex] = trackWorker(
      effectArgs[sagaWorkerArgIndex]
    );
  }

  return next(effect);
};
