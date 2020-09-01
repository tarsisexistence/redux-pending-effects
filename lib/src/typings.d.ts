declare namespace RPE {
  interface State {
    effectsEntity: Record<string, boolean>;
    ignoredActionTypes: null | string[]
  }

  interface PayloadAction<T, P> {
    type: T;
    payload: P;
  }

  type PatchEffectPayload = {
    effectId: string;
    effectType: string;
    actionType: string;
  }

  interface ConfigureOptions {
    promiseMiddleware: boolean,
    toolkitMiddleware: boolean,
    ignoredActionTypes: string[]
  }
}
