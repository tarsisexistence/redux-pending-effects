import { nasaService } from '../services/NasaService';
import { patentsActionsNames } from '../constants';
import { Actions } from './types';

export const getPatents = (): Actions.PatentsTypes => ({
  type: patentsActionsNames.GET,
  payload: nasaService.getPatents()
});