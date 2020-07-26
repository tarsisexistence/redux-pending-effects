declare namespace Reducers {
  interface PatentsReducerState {
    patentsData: Global.PatentDataShape[],
    error: null | string,
    shouldPatentsUpdate: boolean
  }

  interface LibraryReducerState {
    libraryData: Global.LibraryContentDataShape[],
    error: null | string
  }
}