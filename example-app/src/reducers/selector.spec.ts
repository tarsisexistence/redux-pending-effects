import { Store } from 'redux';
import { selectIsPending } from 'redux-pending-effects';
import { configureStore } from '@reduxjs/toolkit';
import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';

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
import {
  patentsFetchMock,
  libraryContentFetchMock,
  astronomyPictureFetchMock,
  rejectedFetchMockParam,
  createSagaTesterInstance
} from './testHelpers';

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

  describe('with saga', () => {
    it('should trigger pending state when saga started', () => {
      sagaMiddleware.run(rootSaga);
      store.dispatch(getAstronomyPictureData);
      expect(selectIsPending(store.getState())).toBe(true);
    });

    it('should complete pending state when saga completed with success', async () => {
      const sagaTester = createSagaTesterInstance();

      fetchMock.mockResponseOnce(...astronomyPictureFetchMock);

      sagaTester.start(rootSaga);
      sagaTester.dispatch(getAstronomyPictureData);
      await sagaTester.waitFor(astronomyPictureActionNames.FULFILLED);
      expect(selectIsPending(sagaTester.getState())).toBe(false);
    });

    it('should complete pending state when saga completed with failure', async () => {
      const sagaTester = createSagaTesterInstance();

      fetchMock.mockRejectOnce(rejectedFetchMockParam);

      sagaTester.start(rootSaga);
      sagaTester.dispatch(getAstronomyPictureData);
      await sagaTester.waitFor(astronomyPictureActionNames.REJECTED);
      expect(selectIsPending(sagaTester.getState())).toBe(false);
    });
  });

  describe('with toolkit', () => {
    it('should trigger pending state when toolkit started', () => {
      store.dispatch<any>(getLibraryContent('test'));
      expect(selectIsPending(store.getState())).toBe(true);
    });

    it('should complete pending state when toolkit completed with success', async () => {
      fetchMock.mockResponseOnce(...libraryContentFetchMock);
      await store.dispatch<any>(getLibraryContent('test'));
      expect(selectIsPending(store.getState())).toBe(false);
    });

    it('should complete pending state when toolkit completed with failure', async () => {
      fetchMock.mockRejectOnce(rejectedFetchMockParam);
      await store.dispatch<any>(getLibraryContent('test'));
      expect(selectIsPending(store.getState())).toBe(false);
    });
  });

  describe('with promise', () => {
    it('should trigger pending state when promise started', () => {
      store.dispatch(getPatents());
      expect(selectIsPending(store.getState())).toBe(true);
    });

    it('should complete pending state when promise completed with success', async () => {
      fetchMock.mockResponseOnce(...patentsFetchMock);

      const getPatentsAction: Actions.GetPatents = getPatents();

      store.dispatch(getPatentsAction);
      await getPatentsAction.payload;
      expect(selectIsPending(store.getState())).toBe(false);
    });

    it('should complete pending state when promise completed with failure', async () => {
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
  });

  describe('with all', () => {
    it('should not complete pending state when one of the fetches(sent by promise and toolkit) is completed', async () => {
      fetchMock.mockResponseOnce(...patentsFetchMock);

      const getPatentsAction: Actions.GetPatents = getPatents();

      store.dispatch(getPatentsAction);
      store.dispatch<any>(getLibraryContent('test'));
      await getPatentsAction.payload;
      expect(selectIsPending(store.getState())).toBe(true);
    });

    it('should complete pending state when all fetches(sent by promise and toolkit) are completed', async () => {
      fetchMock.mockResponses(patentsFetchMock, libraryContentFetchMock);

      const getPatentsAction: Actions.GetPatents = getPatents();

      store.dispatch(getPatentsAction);

      await Promise.all([
        store.dispatch<any>(getLibraryContent('test')),
        getPatentsAction.payload
      ]);

      expect(selectIsPending(store.getState())).toBe(false);
    });

    it('should not complete pending state when one of the fetches(sent by promise and saga) is completed', async () => {
      fetchMock.mockResponse(...patentsFetchMock);

      const sagaTester = createSagaTesterInstance();
      const getPatentsAction: Actions.GetPatents = getPatents();

      sagaTester.start(rootSaga);
      sagaTester.dispatch(getPatentsAction);
      sagaTester.dispatch(getAstronomyPictureData);
      await getPatentsAction.payload;
      expect(selectIsPending(sagaTester.getState())).toBe(true);
    });

    it('should complete pending state when all fetches(sent by promise and saga) are completed', async () => {
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

    it('should not complete pending state when one of the fetches(sent by toolkit and saga) is completed', async () => {
      fetchMock.mockResponseOnce(...astronomyPictureFetchMock);

      const sagaTester = createSagaTesterInstance();

      sagaTester.start(rootSaga);
      sagaTester.dispatch(getAstronomyPictureData);
      sagaTester.dispatch<any>(getLibraryContent('test'));
      await sagaTester.waitFor(astronomyPictureActionNames.FULFILLED);
      expect(selectIsPending(sagaTester.getState())).toBe(true);
    });

    it('should complete pending state when all fetches(sent by toolkit and saga) are completed', async () => {
      fetchMock.mockResponses(
        libraryContentFetchMock,
        astronomyPictureFetchMock
      );

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
});
