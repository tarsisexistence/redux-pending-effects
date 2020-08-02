import { createAsyncThunk } from '@reduxjs/toolkit';

import { nasaService } from '../services/NasaService';
import {
  patentsActionsNames,
  libraryActionNames,
  astronomyPictureActionNames
} from '../constants';

export const getPatents = (): Actions.PatentsTypes => ({
  type: patentsActionsNames.GET,
  payload: nasaService.getPatents()
});

export const getLibraryContent = createAsyncThunk(
  libraryActionNames.GET,
  async (requestValues: string) =>
    await nasaService.getLibraryContent(requestValues)
);

export const getAstronomyPictureData: Actions.AstronomyPictureTypes = {
  type: astronomyPictureActionNames.GET
};

export const getAstronomyPictureDataLoaded = (
  data: Global.AstronomyPictureDataShape
): Actions.AstronomyPictureTypes => ({
  type: astronomyPictureActionNames.FULFILLED,
  payload: data
});

export const getAstronomyPictureDataRejected = (
  errorMessage: string
): Actions.AstronomyPictureTypes => ({
  type: astronomyPictureActionNames.REJECTED,
  payload: {
    errorMessage
  }
});
