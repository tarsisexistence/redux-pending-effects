import SagaTester from 'redux-saga-tester';
import { MockParams } from 'jest-fetch-mock';

import { rootReducer as reducer } from './rootReducer';
import { middleware } from '../store';

type MockResponseParams = [string, MockParams];

const apiKey = 'WmyhwhhQBZJIvTdIQ6KeYZUNenQY7Fazyd2nauB5';
export const patentsFetchMock: MockResponseParams = [
  JSON.stringify({ results: [] }),
  {
    url: `https://api.nasa.gov/techtransfer/patent/?engine&api_key=${apiKey}`
  }
];
export const libraryContentFetchMock: MockResponseParams = [
  JSON.stringify({ collection: { items: [] } }),
  {
    url:
      'https://images-api.nasa.gov/search?q=test&page=1&media_type=image&year_start=1920&year_end=2020'
  }
];
export const astronomyPictureFetchMock: MockResponseParams = [
  JSON.stringify({ title: 'text', url: 'text', explanation: 'text' }),
  {
    url: `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
  }
];
export const rejectedFetchMockParam: Error = {
  name: '600',
  message: 'Some error'
};
export const createSagaTesterInstance = () =>
  new SagaTester({
    initialState: undefined,
    reducers: reducer,
    middlewares: middleware
  });