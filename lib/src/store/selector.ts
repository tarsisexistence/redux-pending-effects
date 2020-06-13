import { REDUX_PENDING_EFFECTS } from '../helpers/const';

export const selectIsPending = <TState>(state: TState): boolean => {
  const pendingState = (state as any)[REDUX_PENDING_EFFECTS] as RPE.State;
  const { effectsEntity } = pendingState;
  const { length: size } = Object.keys(effectsEntity);
  return size > 0;
};
