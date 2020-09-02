import SagaTester from 'redux-saga-tester';
import { MockParams } from 'jest-fetch-mock';
import { createPendingMiddleware } from 'redux-pending-effects';

import { rootReducer as reducer } from './rootReducer';
import { defaultMiddlewares, sagaMiddleware } from '../store';
import {
  patentsActionsNames,
  libraryActionNames,
  astronomyPictureActionNames
} from '../constants';
import { Middleware } from 'redux';

type MockResponseParams = [string, MockParams];

const apiKey = 'WmyhwhhQBZJIvTdIQ6KeYZUNenQY7Fazyd2nauB5';

export const urls = {
  PATENTS: `https://api.nasa.gov/techtransfer/patent/?engine&api_key=${apiKey}`,
  LIBRARY_CONTENT: `https://api.nasa.gov/techtransfer/patent/?engine&api_key=${apiKey}`,
  ASTRONOMY_PICTURE: `https://api.nasa.gov/techtransfer/patent/?engine&api_key=${apiKey}`
};

export const patentsFetchMock: MockResponseParams = [
  JSON.stringify({ results: [] }),
  {
    url: urls.PATENTS
  }
];
export const libraryContentFetchMock: MockResponseParams = [
  JSON.stringify({ collection: { items: [] } }),
  {
    url: urls.LIBRARY_CONTENT
  }
];
export const astronomyPictureFetchMock: MockResponseParams = [
  JSON.stringify({ title: 'text', url: 'text', explanation: 'text' }),
  {
    url: urls.ASTRONOMY_PICTURE
  }
];
export const rejectedFetchMockParam: Error = {
  name: '600',
  message: 'Some error'
};
export const createSagaTesterInstance = (middleware: Middleware[]) =>
  new SagaTester({
    initialState: undefined,
    reducers: reducer,
    middlewares: middleware
  });

const middlewares = [sagaMiddleware, ...defaultMiddlewares];

export const middlewaresWithPromiseActionsIgnored = [
  ...createPendingMiddleware({
    promiseMiddleware: true,
    toolkitMiddleware: true,
    ignoredActionTypes: Object.values(patentsActionsNames)
  }),
  ...middlewares
];
export const middlewaresWithToolkitActionsIgnored = [
  ...createPendingMiddleware({
    promiseMiddleware: true,
    toolkitMiddleware: true,
    ignoredActionTypes: Object.values(libraryActionNames)
  }),
  ...middlewares
];
export const middlewaresWithSagaActionsIgnored = [
  ...createPendingMiddleware({
    promiseMiddleware: true,
    toolkitMiddleware: true,
    ignoredActionTypes: Object.values(astronomyPictureActionNames)
  }),
  ...middlewares
];
