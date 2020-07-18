import { patentsActionsNames } from '../constants';

export namespace Actions {
  interface IGetPatents {
    type: typeof patentsActionsNames.GET,
    payload: Promise<Patents.PatentDataShape[] | { status: string }>
  }

  interface IGetPatentsPending {
    type: typeof patentsActionsNames.PENDING,
    payload:  Promise<Patents.PatentDataShape[] | { status: string }>
  }

  interface IGetPatentsFulFilled {
    type: typeof patentsActionsNames.FULFILLED,
    payload: Promise<Patents.PatentDataShape[]>
  }

  interface IGetPatentsRejected {
    type: typeof patentsActionsNames.REJECTED,
    payload: { status: string }
  }

  export type PatentsTypes = IGetPatents | IGetPatentsPending | IGetPatentsFulFilled | IGetPatentsRejected;
}