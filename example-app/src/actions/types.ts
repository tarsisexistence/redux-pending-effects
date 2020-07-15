import { PATENTS } from '../constants/actions';

export type GetPatentsType = {
  type: typeof PATENTS.GET,
  payload: Promise<any>
}

