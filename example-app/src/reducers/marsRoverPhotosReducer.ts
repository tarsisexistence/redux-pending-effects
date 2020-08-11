import { AnyAction } from 'redux';

import { marsRoverPhotosActionNames } from '../constants';

export type MarsRoverPhotosReducerState = {
  photosData: any;
  error: null | string;
  loading: boolean;
  shouldPhotosDataUpdate: boolean;
};

const defaultState: MarsRoverPhotosReducerState = {
  photosData: [],
  error: null,
  loading: false,
  shouldPhotosDataUpdate: true
};

export const marsRoverPhotosReducer = (
  state = defaultState,
  action: Actions.MarsRoverPhotosTypes | AnyAction
) => {
  switch (action.type) {
    case marsRoverPhotosActionNames.PENDING:
      return {
        ...state,
        loading: true,
        shouldPhotosDataUpdate: false
      };
    case marsRoverPhotosActionNames.FULFILLED:
      return {
        ...state,
        loading: false,
        photosData: (action as Actions.MarsRoverPhotosFulFilled).payload
      };
    case marsRoverPhotosActionNames.REJECTED:
      return {
        ...state,
        loading: false,
        error: (action as Actions.MarsRoverPhotosRejected).payload
      };
    default:
      return state;
  }
};
