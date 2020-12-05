import { REDUX_PENDING_EFFECTS_PATCH_EFFECT } from '../helpers/const';

export const patchEffect = (
  payload: RPE.PatchEffectPayload
): { type: string; payload: RPE.PatchEffectPayload } => ({
  type: REDUX_PENDING_EFFECTS_PATCH_EFFECT,
  payload
});
