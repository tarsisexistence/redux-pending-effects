export const REDUX_PENDING_EFFECTS = '@@REDUX_PENDING_EFFECTS';
export const REDUX_PENDING_EFFECTS_PATCH_EFFECT =
  '@@REDUX_PENDING_EFFECTS/PATCH_EFFECT';
export const REDUX_PENDING_EFFECTS_IGNORED_ACTION_TYPES =
  '@@REDUX_PENDING_EFFECTS/IGNORED_ACTION_TYPES';
export const effectTypes = {
  saga: 'redux-saga',
  promise: 'redux-pending-middleware',
  toolkit: 'redux-toolkit'
};
