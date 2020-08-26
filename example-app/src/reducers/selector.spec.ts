import { Store } from 'redux';
import { selectIsPending } from 'redux-pending-effects';
import SagaTester from 'redux-saga-tester';
import { configureStore } from '@reduxjs/toolkit';
import fetchMock, { enableFetchMocks, MockParams } from 'jest-fetch-mock';

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

type MockResponseParams = [string, MockParams];

const apiKey = 'WmyhwhhQBZJIvTdIQ6KeYZUNenQY7Fazyd2nauB5';
const patentsFetchMock: MockResponseParams = [
  JSON.stringify({ results: [] }),
  {
    url: `https://api.nasa.gov/techtransfer/patent/?engine&api_key=${apiKey}`
  }
];
const libraryContentFetchMock: MockResponseParams = [
  JSON.stringify({ collection: { items: [] } }),
  {
    url: 'https://images-api.nasa.gov/search?q=test&page=1&media_type=image&year_start=1920&year_end=2020'
  }
];
const astronomyPictureFetchMock: MockResponseParams = [
  JSON.stringify({ title: 'text', url: 'text', explanation: 'text' }),
  {
    url: `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
  }
];
const rejectedFetchMockParam: Error = {
  name: '600',
  message: 'Some error'
};
const createSagaTesterInstance = () =>
  new SagaTester({
    initialState: undefined,
    reducers: reducer,
    middlewares: middleware
  });

describe('selector', () => {
  let store: Store;

  enableFetchMocks();

  beforeEach(() => {
    store = configureStore({ reducer, middleware });
    fetchMock.resetMocks();
  });

  it('should have default negative pending state', () => {
    expect(selectIsPending(store.getState())).toBe(false);
  });

  it('should trigger pending state after getPatents fetch started', () => {
    store.dispatch(getPatents());
    expect(selectIsPending(store.getState())).toBe(true);
  });

  it('should complete pending state after getPatents fetch completed with success', async () => {
    fetchMock.mockResponseOnce(...patentsFetchMock);

    const getPatentsAction: Actions.GetPatents = getPatents();

    store.dispatch(getPatentsAction);
    await getPatentsAction.payload;
    expect(selectIsPending(store.getState())).toBe(false);
  });

  it('should complete pending state after getPatents fetch completed with failure', async () => {
    fetchMock.mockRejectOnce(rejectedFetchMockParam);

    const getPatentsAction: Actions.GetPatents = getPatents();

    try {
      store.dispatch(getPatentsAction);
      await getPatentsAction.payload;
    } catch (e) {

    } finally {
      expect(selectIsPending(store.getState())).toBe(false);
    }
  });

  it('should trigger pending state after getLibraryContent fetch started', () => {
    store.dispatch<any>(getLibraryContent('test'));
    expect(selectIsPending(store.getState())).toBe(true);
  });

  it('should complete pending state after getLibraryContent fetch completed with success', async () => {
    fetchMock.mockResponseOnce(...libraryContentFetchMock);
    await store.dispatch<any>(getLibraryContent('test'));
    expect(selectIsPending(store.getState())).toBe(false);
  });

  it('should complete pending state after getLibraryContent fetch completed with failure', async () => {
    fetchMock.mockRejectOnce(rejectedFetchMockParam);
    await store.dispatch<any>(getLibraryContent('test'));
    expect(selectIsPending(store.getState())).toBe(false);
  });

  it('should trigger pending state after getAstronomyPictureData fetch started', () => {
    sagaMiddleware.run(rootSaga);
    store.dispatch(getAstronomyPictureData);
    expect(selectIsPending(store.getState())).toBe(true);
  });

  it('should complete pending state after getAstronomyPictureData fetch completed with success', async () => {
    const sagaTester = createSagaTesterInstance();

    fetchMock.mockResponseOnce(...astronomyPictureFetchMock);

    sagaTester.start(rootSaga);
    sagaTester.dispatch(getAstronomyPictureData);
    await sagaTester.waitFor(astronomyPictureActionNames.FULFILLED);
    expect(selectIsPending(sagaTester.getState())).toBe(false);
  });

  it('should complete pending state after getAstronomyPictureData fetch completed with failure', async () => {
    const sagaTester = createSagaTesterInstance();

    fetchMock.mockRejectOnce(rejectedFetchMockParam);

    sagaTester.start(rootSaga);
    sagaTester.dispatch(getAstronomyPictureData);
    await sagaTester.waitFor(astronomyPictureActionNames.REJECTED);
    expect(selectIsPending(sagaTester.getState())).toBe(false);
  });

  it('should not complete pending state after one of fetches(getPatents or getLibraryContent) is completed', async () => {
    fetchMock.mockResponseOnce(...patentsFetchMock);

    const getPatentsAction: Actions.GetPatents = getPatents();

    store.dispatch(getPatentsAction);
    store.dispatch<any>(getLibraryContent('test'));
    await getPatentsAction.payload;
    expect(selectIsPending(store.getState())).toBe(true);
  });

  it('should complete pending state after all fetches(getPatents and getLibraryContent) are completed', async () => {
    fetchMock.mockResponses(patentsFetchMock, libraryContentFetchMock);

    const getPatentsAction: Actions.GetPatents = getPatents();

    store.dispatch(getPatentsAction);

    await Promise.all([
      store.dispatch<any>(getLibraryContent('test')),
      getPatentsAction.payload
    ]);

    expect(selectIsPending(store.getState())).toBe(false);
  });

  it('should not complete pending state after one of fetches(getPatents or getAstronomyPictureData) is completed', async () => {
    fetchMock.mockResponse(...patentsFetchMock);

    const sagaTester = createSagaTesterInstance();
    const getPatentsAction: Actions.GetPatents = getPatents();

    sagaTester.start(rootSaga);
    sagaTester.dispatch(getPatentsAction);
    sagaTester.dispatch(getAstronomyPictureData);
    await getPatentsAction.payload;
    expect(selectIsPending(sagaTester.getState())).toBe(true);
  });

  it('should complete pending state after all fetches(getPatents and getAstronomyPictureData) are completed', async () => {
    fetchMock.mockResponses(patentsFetchMock, astronomyPictureFetchMock);

    const sagaTester = createSagaTesterInstance();
    const getPatentsAction: Actions.GetPatents = getPatents();

    sagaTester.start(astronomyPictureWorker);
    sagaTester.dispatch(getPatentsAction);
    sagaTester.dispatch(getAstronomyPictureData);

    await Promise.all([
      getPatentsAction.payload,
      sagaTester.waitFor(astronomyPictureActionNames.FULFILLED)
    ]);

    expect(selectIsPending(sagaTester.getState())).toBe(false);
  });

  it('should not complete pending state after one of fetches(getLibraryContent or getAstronomyPictureData) is completed', async () => {
    fetchMock.mockResponseOnce(...astronomyPictureFetchMock);

    const sagaTester = createSagaTesterInstance();

    sagaTester.start(rootSaga);
    sagaTester.dispatch(getAstronomyPictureData);
    sagaTester.dispatch<any>(getLibraryContent('test'));
    await sagaTester.waitFor(astronomyPictureActionNames.FULFILLED);
    expect(selectIsPending(sagaTester.getState())).toBe(true);
  });

  it('should complete pending state after all fetches(getLibraryContent and getAstronomyPictureData) are completed', async () => {
    fetchMock.mockResponses(libraryContentFetchMock, astronomyPictureFetchMock);

    const sagaTester = createSagaTesterInstance();
    const libraryContentPromise = sagaTester.dispatch<any>(
      getLibraryContent('test')
    );

    sagaTester.start(rootSaga);
    sagaTester.dispatch(getAstronomyPictureData);

    await Promise.all([
      libraryContentPromise,
      sagaTester.waitFor(astronomyPictureActionNames.FULFILLED)
    ]);

    expect(selectIsPending(sagaTester.getState())).toBe(false);
  });
});
