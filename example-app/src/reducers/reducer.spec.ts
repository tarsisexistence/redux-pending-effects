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
import { rootReducerWrapper } from './rootReducer';

describe('store testing on RPE selector', () => {
  afterEach(() => {
    store.dispatch({
      type: clearStoreActionName
    });
  });

  it('should test selectIsPending changing on getPatents fetch', async () => {
    const getPatentsAction: Actions.GetPatents = getPatents();

    expect(selectIsPending(store.getState())).toBe(false);

    store.dispatch(getPatentsAction);

    expect(selectIsPending(store.getState())).toBe(true);

    await getPatentsAction.payload;

    expect(selectIsPending(store.getState())).toBe(false);
  });

  it('should test selectIsPending changing on getLibraryContent fetch', async () => {
    expect(selectIsPending(store.getState())).toBe(false);

    store.dispatch<any>(getLibraryContent('test'));

    expect(selectIsPending(store.getState())).toBe(true);

    await nasaService.getLibraryContent('test');

    expect(selectIsPending(store.getState())).toBe(false);
  });

  it('should test selectIsPending changing on getAstronomyPictureData fetch', async () => {
    const sagaTester = new SagaTester({
      initialState: undefined,
      reducers: rootReducerWrapper
    });

    expect(selectIsPending(store.getState())).toBe(false);

    sagaTester.start(astronomyPictureWorker);

    store.dispatch(getAstronomyPictureData);

    expect(selectIsPending(store.getState())).toBe(true);

    await sagaTester.waitFor(astronomyPictureActionNames.FULFILLED);

    expect(selectIsPending(store.getState())).toBe(false);
  });
});
