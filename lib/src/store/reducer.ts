import { Action, AnyAction, Reducer, ReducersMapObject } from 'redux';

import {
  REDUX_PENDING_EFFECTS,
  REDUX_PENDING_EFFECTS_IGNORED_ACTION_TYPES,
  REDUX_PENDING_EFFECTS_PATCH_EFFECT
} from '../helpers/const';

type PatchEffectPayloadAction = RPE.PayloadAction<
  typeof REDUX_PENDING_EFFECTS_PATCH_EFFECT,
  RPE.PatchEffectPayload
>;
type IgnoredActionTypesPayloadAction = RPE.PayloadAction<
  typeof REDUX_PENDING_EFFECTS_IGNORED_ACTION_TYPES,
  string[]
>;
type PayloadAction = PatchEffectPayloadAction | IgnoredActionTypesPayloadAction;

const defaultState: RPE.State = {
  effectsEntity: {},
  ignoredActionTypes: null
};

const pendingReducer: Reducer<RPE.State, PayloadAction> = (
  state = defaultState,
  action: PayloadAction
): RPE.State => {
  if (action.type === REDUX_PENDING_EFFECTS_IGNORED_ACTION_TYPES) {
    return {
      ...state,
      ignoredActionTypes: (action as IgnoredActionTypesPayloadAction).payload
    };
  }

  if (action.type === REDUX_PENDING_EFFECTS_PATCH_EFFECT) {
    const { effectsEntity, ignoredActionTypes } = state;
    const {
      payload: { effectId, actionType }
    } = action as PatchEffectPayloadAction;

    if (
      ignoredActionTypes !== null &&
      ignoredActionTypes.includes(actionType)
    ) {
      return state;
    }

    let updatedEffectsEntity;

    if (effectsEntity[effectId] === undefined) {
      updatedEffectsEntity = { ...effectsEntity, [effectId]: actionType };
    } else {
      const { [effectId]: oldEffectId, ...restEffectsId } = effectsEntity;
      updatedEffectsEntity = restEffectsId;
    }

    return { ...state, effectsEntity: updatedEffectsEntity };
  }

  return state;
};

export function includePendingReducer<S, A extends Action = AnyAction>(
  reducers: ReducersMapObject<S, A>
): ReducersMapObject<S, A> {
  (reducers as any)[REDUX_PENDING_EFFECTS] = pendingReducer;
  return reducers;
}
