declare namespace RPE {
  interface State {
    effectsEntity: Record<string, boolean>;
    ignoredActions: string[],
    isIgnoredActionsSetUp: boolean
  }

  interface PayloadAction<T, P> {
    type: T;
    payload: P;
  }

  type PatchEffectPayload = {
    effectId: string;
    actionType: string;
  }

  interface FactoryOptions {
    promiseMiddleware: boolean,
    toolkitMiddleware: boolean,
    ignoredActions: string[]
  }
}
