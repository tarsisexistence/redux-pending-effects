import { Store } from 'redux';
import { selectIsPending } from 'redux-pending-effects';
import SagaTester from 'redux-saga-tester';
import { configureStore } from '@reduxjs/toolkit';

import { middleware, sagaMiddleware } from '../store';
import { getPatents, getLibraryContent, getAstronomyPictureData } from '../actions';
import { astronomyPictureActionNames } from '../constants';
import { astronomyPictureWorker } from '../sagas/astronomyPictureSagas';
import { rootReducer, rootReducer as reducer } from './rootReducer';
import { rootSaga } from '../sagas';

describe('selector', () => {
  let store: Store;

  beforeEach(() => {
    store = configureStore({ reducer, middleware });
  });

  it('should have default negative pending state', () => {
    expect(selectIsPending(store.getState())).toBe(false);
  });

  it('should trigger pending state after getPatents fetch started', async () => {
    store.dispatch(getPatents());
    expect(selectIsPending(store.getState())).toBe(true);
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
  });

  it('should complete pending state after getLibraryContent fetch completed', async () => {
    await store.dispatch<any>(getLibraryContent('test'));
    expect(selectIsPending(store.getState())).toBe(false);
  });

  it('should trigger pending state after getAstronomyPictureData fetch started', async () => {
    sagaMiddleware.run(rootSaga);
    store.dispatch(getAstronomyPictureData);
    expect(selectIsPending(store.getState())).toBe(true);
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

    await Promise.race([
      store.dispatch<any>(getLibraryContent('test')),
      getPatentsAction.payload
    ]);

    expect(selectIsPending(store.getState())).toBe(true);
  });

  it('should complete pending state after all fetches are completed', async () => {
    const getPatentsAction: Actions.GetPatents = getPatents();

    store.dispatch(getPatentsAction);

    await Promise.all([
      store.dispatch<any>(getLibraryContent('test')),
      getPatentsAction.payload
    ]);

    expect(selectIsPending(store.getState())).toBe(false);
  });
});
