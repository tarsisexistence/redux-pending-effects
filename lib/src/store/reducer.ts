import { Action, AnyAction, Reducer, ReducersMapObject } from 'redux';

import {
  REDUX_PENDING_EFFECTS,
  REDUX_PENDING_EFFECTS_IGNORED_ACTIONS,
  REDUX_PENDING_EFFECTS_PATCH_EFFECT
} from '../helpers/const';

type PatchEffectPayloadAction = RPE.PayloadAction<
  typeof REDUX_PENDING_EFFECTS_PATCH_EFFECT,
  {
    effectId: string;
    actionType: string;
  }
>;
type IgnoredActionsPayloadAction = RPE.PayloadAction<
  typeof REDUX_PENDING_EFFECTS_IGNORED_ACTIONS,
  string[]
>;
type PayloadAction = PatchEffectPayloadAction | IgnoredActionsPayloadAction;

const defaultState: RPE.State = {
  effectsEntity: {},
  ignoredActions: [],
  isIgnoredActionsSetUp: false
};

const pendingReducer: Reducer<RPE.State, PayloadAction> = (
  state = defaultState,
  action: PayloadAction
): RPE.State => {
  if (action.type === REDUX_PENDING_EFFECTS_IGNORED_ACTIONS) {
    return {
      ...state,
      ignoredActions: (action as IgnoredActionsPayloadAction).payload,
      isIgnoredActionsSetUp: true
    };
  }

  if (action.type === REDUX_PENDING_EFFECTS_PATCH_EFFECT) {
    const { effectsEntity, ignoredActions, isIgnoredActionsSetUp } = state;
    const {
      payload: { effectId, actionType }
    } = action as PatchEffectPayloadAction;

    if (isIgnoredActionsSetUp && ignoredActions.includes(actionType)) {
      return state;
    }

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
  (reducers as any)[REDUX_PENDING_EFFECTS] = pendingReducer;
  return reducers;
}
