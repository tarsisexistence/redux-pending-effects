import { Store } from 'redux';
import { selectIsPending } from 'redux-pending-effects';
import SagaTester from 'redux-saga-tester';
import { configureStore } from '@reduxjs/toolkit';

import { middleware, sagaMiddleware } from '../store';
import {
  getPatents,
  getLibraryContent,
  getAstronomyPictureData
} from '../actions';
import { astronomyPictureActionNames } from '../constants';
import { astronomyPictureWorker } from '../sagas/astronomyPictureSagas';
import { rootReducer as reducer } from './rootReducer';
import { rootSaga } from '../sagas';

describe('selector', () => {
  let store: Store;

  beforeEach(() => {
    store = configureStore({ reducer, middleware });
  });

  it('should have default negative pending state', () => {
    expect(selectIsPending(store.getState())).toBe(false);
  });

  it('should trigger pending state after getPatents fetch started', () => {
    store.dispatch(getPatents());
    expect(selectIsPending(store.getState())).toBe(true);
  });

  it('should complete pending state after getPatents fetch completed', async () => {
    const getPatentsAction: Actions.GetPatents = getPatents();

    store.dispatch(getPatentsAction);
    await getPatentsAction.payload;
    expect(selectIsPending(store.getState())).toBe(false);
  });

  it('should trigger pending state after getLibraryContent fetch started', () => {
    store.dispatch<any>(getLibraryContent('test'));
    expect(selectIsPending(store.getState())).toBe(true);
  });

  it('should complete pending state after getLibraryContent fetch completed', async () => {
    await store.dispatch<any>(getLibraryContent('test'));
    expect(selectIsPending(store.getState())).toBe(false);
  });

  it('should trigger pending state after getAstronomyPictureData fetch started', () => {
    sagaMiddleware.run(rootSaga);
    store.dispatch(getAstronomyPictureData);
    expect(selectIsPending(store.getState())).toBe(true);
  });

  it('should complete pending state after getAstronomyPictureData fetch completed', async () => {
    const sagaTester = new SagaTester({
      initialState: undefined,
      reducers: reducer,
      middlewares: middleware
    });

    sagaTester.start(astronomyPictureWorker);
    sagaTester.dispatch(getAstronomyPictureData);

    await Promise.race([
      sagaTester.waitFor(astronomyPictureActionNames.FULFILLED),
      sagaTester.waitFor(astronomyPictureActionNames.REJECTED)
    ]);

    expect(selectIsPending(sagaTester.getState())).toBe(false);
  });

  it('should not complete pending state after one of fetches(getPatents or getLibraryContent) is completed', async () => {
    const getPatentsAction: Actions.GetPatents = getPatents();

    store.dispatch(getPatentsAction);

    await Promise.race([
      store.dispatch<any>(getLibraryContent('test')),
      getPatentsAction.payload
    ]);

    expect(selectIsPending(store.getState())).toBe(true);
  });

  it('should complete pending state after all fetches(getPatents and getLibraryContent) are completed', async () => {
    const getPatentsAction: Actions.GetPatents = getPatents();

    store.dispatch(getPatentsAction);

    await Promise.all([
      store.dispatch<any>(getLibraryContent('test')),
      getPatentsAction.payload
    ]);

    expect(selectIsPending(store.getState())).toBe(false);
  });

  it('should not complete pending state after one of fetches(getPatents or getAstronomyPictureData) is completed', async () => {
    const getPatentsAction: Actions.GetPatents = getPatents();
    const sagaTester = new SagaTester({
      initialState: undefined,
      reducers: reducer,
      middlewares: middleware
    });

    sagaTester.start(astronomyPictureWorker);
    sagaTester.dispatch(getAstronomyPictureData);
    sagaTester.dispatch(getPatentsAction);

    await Promise.race([
      getPatentsAction.payload,
      sagaTester.waitFor(astronomyPictureActionNames.FULFILLED),
      sagaTester.waitFor(astronomyPictureActionNames.REJECTED)
    ]);

    expect(selectIsPending(sagaTester.getState())).toBe(true);
  });

  it('should complete pending state after one of fetches(getPatents and getAstronomyPictureData) is completed', async () => {
    const getPatentsAction: Actions.GetPatents = getPatents();
    const sagaTester = new SagaTester({
      initialState: undefined,
      reducers: reducer,
      middlewares: middleware
    });

    sagaTester.start(astronomyPictureWorker);
    sagaTester.dispatch(getAstronomyPictureData);
    sagaTester.dispatch(getPatentsAction);

    await Promise.all([
      getPatentsAction.payload,
      Promise.race([
        sagaTester.waitFor(astronomyPictureActionNames.FULFILLED),
        sagaTester.waitFor(astronomyPictureActionNames.REJECTED)
      ])
    ]);

    expect(selectIsPending(sagaTester.getState())).toBe(false);
  });

  it('should not complete pending state after one of fetches(getLibraryContent or getAstronomyPictureData) is completed', async () => {
    const sagaTester = new SagaTester({
      initialState: undefined,
      reducers: reducer,
      middlewares: middleware
    });
    const libraryContentPromise = sagaTester.dispatch<any>(
      getLibraryContent('test')
    );

    sagaTester.start(astronomyPictureWorker);
    sagaTester.dispatch(getAstronomyPictureData);

    await Promise.race([
      libraryContentPromise,
      sagaTester.waitFor(astronomyPictureActionNames.FULFILLED),
      sagaTester.waitFor(astronomyPictureActionNames.REJECTED)
    ]);

    expect(selectIsPending(sagaTester.getState())).toBe(true);
  });

  it('should complete pending state after one of fetches(getLibraryContent and getAstronomyPictureData) is completed', async () => {
    const sagaTester = new SagaTester({
      initialState: undefined,
      reducers: reducer,
      middlewares: middleware
    });
    const libraryContentPromise = sagaTester.dispatch<any>(
      getLibraryContent('test')
    );

    sagaTester.start(astronomyPictureWorker);
    sagaTester.dispatch(getAstronomyPictureData);

    await Promise.all([
      libraryContentPromise,
      Promise.race([
        sagaTester.waitFor(astronomyPictureActionNames.FULFILLED),
        sagaTester.waitFor(astronomyPictureActionNames.REJECTED)
      ])
    ]);

    expect(selectIsPending(sagaTester.getState())).toBe(false);
  });
});
