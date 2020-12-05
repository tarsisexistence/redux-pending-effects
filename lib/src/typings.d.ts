declare namespace RPE {
  interface State {
    effectsEntity: Record<string, string>;
    ignoredActionTypes: null | string[];
  }

  interface PayloadAction<T, P> {
    type: T;
    payload: P;
  }

  type PatchEffectPayload = {
    effectId: string;
    effectType: string;
    actionType: string;
  };

  interface ConfigureOptions {
    promise: boolean;
    toolkit: boolean;
    saga: boolean;
    ignoredActionTypes: string[];
  }

  interface ConfigureOutput<T, K> {
    middlewares: T[];
    sagaOptions: {
      effectMiddlewares: K[];
    };
  }
}
