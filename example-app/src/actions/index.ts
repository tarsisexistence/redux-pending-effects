import { nasaService } from '../services/NasaService';
import { patentsActionsNames } from '../constants';

export const getPatents = (): Actions.PatentsTypes => ({
  type: patentsActionsNames.GET,
  payload: nasaService.getPatents()
});