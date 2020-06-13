import { Action, AnyAction, Reducer, ReducersMapObject } from 'redux';

import {
  REDUX_PENDING_MIDDLEWARE,
  REDUX_PENDING_MIDDLEWARE_PATCH_EFFECT
} from '../helpers/const';

const pendingReducer: Reducer<
  RPE.State,
  RPE.PayloadAction<typeof REDUX_PENDING_MIDDLEWARE_PATCH_EFFECT, string>
> = (
  state: RPE.State = { effectsEntity: {} },
  action: RPE.PayloadAction<
    typeof REDUX_PENDING_MIDDLEWARE_PATCH_EFFECT,
    string
  >
): RPE.State => {
  if (action.type === REDUX_PENDING_MIDDLEWARE_PATCH_EFFECT) {
    const { effectsEntity } = state;
    const { payload: effectId } = action;

    let updatedEffectsEntity;

    if (effectsEntity[effectId] === undefined) {
      updatedEffectsEntity = { ...effectsEntity, [effectId]: true };
    } else {
      const { [effectId]: oldEffectId, ...restEffectsId } = effectsEntity;
      updatedEffectsEntity = restEffectsId;
    }

    return { ...state, effectsEntity: updatedEffectsEntity };
  }

  return state;
};

export function insertPending<S, A extends Action = AnyAction>(
  reducers: ReducersMapObject<S, A>
): ReducersMapObject<S, A> {
  (reducers as any)[REDUX_PENDING_MIDDLEWARE] = pendingReducer;
  return reducers;
}
