declare namespace Actions {
  interface IGetPatents {
    type: string,
    payload: Promise<Patents.PatentDataShape[] | { status: string }>
  }

  interface IGetPatentsPending {
    type: string,
  }

  interface IGetPatentsFulFilled {
    type: string,
    payload: Patents.PatentDataShape[]
  }

  interface IGetPatentsRejected {
    type: string,
    payload: { status: string }
  }

  interface IPatents extends IGetPatents,
    IGetPatentsPending,
    IGetPatentsFulFilled,
    IGetPatentsRejected {}
}