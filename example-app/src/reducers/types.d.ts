declare namespace Reducers {
  interface PatentsReducerState {
    patentsData: Patents.PatentDataShape[],
    error: null | string,
    shouldPatentsUpdate: boolean
  }
}