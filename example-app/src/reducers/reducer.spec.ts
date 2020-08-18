import { selectIsPending } from 'redux-pending-effects';
import SagaTester from 'redux-saga-tester';

import { store } from '../store';
import {
  getPatents,
  getLibraryContent,
  getAstronomyPictureData
} from '../actions';
import { astronomyPictureActionNames, clearStoreActionName } from '../constants/actionNames';
import { nasaService } from '../services/NasaService';
import { astronomyPictureWorker } from '../sagas/astronomyPictureSagas';
import { rootReducer } from './rootReducer';

describe('selector', () => {
  afterEach(() => {
    store.dispatch({
      type: clearStoreActionName
    });
  });

  it('should have default negative pending state',() => {
    expect(selectIsPending(store.getState())).toBe(false);
  });

  it('should trigger pending state after   fetch started',async () => {
    const getPatentsAction: Actions.GetPatents = getPatents();

    store.dispatch(getPatentsAction);
    expect(selectIsPending(store.getState())).toBe(true);
    await getPatentsAction.payload;
  });

  it('should complete pending state after getPatents fetch completed', async () => {
    const getPatentsAction: Actions.GetPatents = getPatents();

    store.dispatch(getPatentsAction);
    await getPatentsAction.payload;
    expect(selectIsPending(store.getState())).toBe(false);
  });

  it('should trigger pending state after getLibraryContent fetch started', async () => {
    store.dispatch<any>(getLibraryContent('test'));
    expect(selectIsPending(store.getState())).toBe(true);
    await nasaService.getLibraryContent('test');
  });

  it('should complete pending state after getLibraryContent fetch completed', async () => {
    store.dispatch<any>(getLibraryContent('test'));
    await nasaService.getLibraryContent('test');
    expect(selectIsPending(store.getState())).toBe(false);
  });

  it('should trigger pending state after getAstronomyPictureData fetch started', async () => {
    const sagaTester = new SagaTester({
      initialState: undefined,
      reducers: rootReducer
    });

    sagaTester.start(astronomyPictureWorker);
    store.dispatch(getAstronomyPictureData);
    expect(selectIsPending(store.getState())).toBe(true);
    await sagaTester.waitFor(astronomyPictureActionNames.FULFILLED);
  });

  it('should complete pending state after getAstronomyPictureData fetch completed', async () => {
    const sagaTester = new SagaTester({
      initialState: undefined,
      reducers: rootReducer
    });

    sagaTester.start(astronomyPictureWorker);
    store.dispatch(getAstronomyPictureData);
    await sagaTester.waitFor(astronomyPictureActionNames.FULFILLED);
    expect(selectIsPending(store.getState())).toBe(false);
  });

  it('should not complete pending state after one of fetches is completed', async () => {
    const getPatentsAction: Actions.GetPatents = getPatents();

    store.dispatch(getPatentsAction);
    store.dispatch<any>(getLibraryContent('test'));

    await Promise.race([
      nasaService.getLibraryContent('test'),
      getPatentsAction.payload
    ]);

    expect(selectIsPending(store.getState())).toBe(true)
  });

  it('should complete pending state after all fetches are completed', async () => {
    const getPatentsAction: Actions.GetPatents = getPatents();

    store.dispatch(getPatentsAction);
    store.dispatch<any>(getLibraryContent('test'));

    await Promise.all([
      nasaService.getLibraryContent('test'),
      getPatentsAction.payload
    ]);

    expect(selectIsPending(store.getState())).toBe(false)
  });
});
