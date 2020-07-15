import { NasaService } from '../services/NasaService';
import { PATENTS } from '../constants/actions';
import { GetPatentsType } from './types';

const nasaService = new NasaService();

export const getPatents = (): GetPatentsType => ({
  type: PATENTS.GET,
  payload: nasaService.getPatents()
});