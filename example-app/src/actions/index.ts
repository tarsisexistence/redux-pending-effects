import { nasaService } from '../services/NasaService';
import { patentsActionsNames } from '../constants';

export const getPatents = (): Actions.IPatents => ({
  type: patentsActionsNames.GET,
  payload: nasaService.getPatents()
});