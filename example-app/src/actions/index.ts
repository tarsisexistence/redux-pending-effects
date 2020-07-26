import { createAsyncThunk } from '@reduxjs/toolkit';

import { nasaService } from '../services/NasaService';
import { patentsActionsNames, libraryActionNames } from '../constants';

export const getPatents = (): Actions.PatentsTypes => ({
  type: patentsActionsNames.GET,
  payload: nasaService.getPatents()
});

export const getLibraryContent = createAsyncThunk(
  libraryActionNames.GET,
  async (requestValues: string) => (
    await nasaService.getLibraryContent(requestValues)
  )
);