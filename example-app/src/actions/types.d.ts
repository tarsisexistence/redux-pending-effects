declare namespace Actions {
  enum PATENTS_ACTION_TYPES {
    GET = 'GET_PATENTS',
    PENDING = 'GET_PATENTS_PENDING',
    FULFILLED = 'GET_PATENTS_FULFILLED',
    REJECTED = 'GET_PATENTS_REJECTED'
  }

  interface IGetPatents {
    type: ReturnType<typeof PATENTS_ACTION_TYPES.GET>,
    payload: Promise<Patents.PatentDataShape[] | { status: string }>
  }

  interface IGetPatentsPending {
    type:  ReturnType<typeof PATENTS_ACTION_TYPES.PENDING>,
  }

  interface IGetPatentsFulFilled {
    type:  ReturnType<typeof PATENTS_ACTION_TYPES.FULFILLED>,
    payload: Patents.PatentDataShape[]
  }

  interface IGetPatentsRejected {
    type:  ReturnType<typeof PATENTS_ACTION_TYPES.REJECTED>,
    payload: { status: string }
  }

  interface IPatents extends IGetPatents,
    IGetPatentsPending,
    IGetPatentsFulFilled,
    IGetPatentsRejected {}
}