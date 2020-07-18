import { rootReducer } from './rootReducer';

namespace Reducers {
  export interface PatentsReducerState {
    patentsData: Patents.PatentDataShape[],
    error: null | string,
    shouldPatentsUpdate: boolean
  }

  export type RootState = ReturnType<typeof rootReducer>;
}