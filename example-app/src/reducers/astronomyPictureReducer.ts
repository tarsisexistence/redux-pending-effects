import { AnyAction } from 'redux';

import { astronomyPictureActionNames } from '../constants';

const defaultState: Reducers.AstronomyPictureReducerState = {
  astronomyPictureData: null,
  error: null,
  shouldAstronomyPictureDataUpdate: true
};

export const astronomyPictureReducer = (
  state = defaultState,
  action: Actions.AstronomyPictureTypes | AnyAction
) => {
  switch (action.type) {
    case astronomyPictureActionNames.FULFILLED:
      return {
        astronomyPictureData: (action as Actions.getAstronomyPictureFulFilled)
          .payload,
        error: null,
        shouldAstronomyPictureDataUpdate: false
      };
    case astronomyPictureActionNames.REJECTED:
      return {
        astronomyPictureData: null,
        error: (action as Actions.getAstronomyPictureFulRejected).payload
          .errorMessage,
        shouldAstronomyPictureDataUpdate: false
      };
    default:
      return state;
  }
};
