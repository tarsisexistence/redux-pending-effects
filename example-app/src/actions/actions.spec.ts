import configureStore from 'redux-mock-store';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { promiseMiddleware, toolkitMiddleware } from 'redux-pending-effects';
import createSagaMiddleware from '@redux-saga/core';
import fetchMock, { MockParams } from 'jest-fetch-mock';

import { patentsActionsNames } from '../constants';
import { getPatents } from './index';

const defaultMiddlewares = getDefaultMiddleware();
const sagaMiddleware = createSagaMiddleware();
const middleware = [
  promiseMiddleware,
  toolkitMiddleware,
  sagaMiddleware,
  ...defaultMiddlewares
];

const mockStore = configureStore(middleware);

describe('testing async actions', () => {
  const apiKey = 'WmyhwhhQBZJIvTdIQ6KeYZUNenQY7Fazyd2nauB5';
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({});
  });

  afterEach(() => {
    fetchMock.resetMocks();
    store = null as any;
  });

  it('creates GET_PATENTS_FULFILLED when fetching patents has been done', () => {
    fetchMock.mockOnce(
      `https://api.nasa.gov/techtransfer/patent/?engine&api_key=${apiKey}`,
      {
        results: [
          '5bcafde29600021147742e3a',
          'LEW-TOPS-125',
          'Aircraft Engine Icing Event Avoidance and Mitigation',
          "Innovators at NASA's Glenn Research Center",
          'LEW-TOPS-125',
          'aeronautics',
          '',
          '',
          '',
          '',
          'https://technology.nasa.gov/test.jpg'
        ]
      } as MockParams
    );

    const expectedActions = [
      { type: patentsActionsNames.PENDING },
      {
        type: patentsActionsNames.FULFILLED,
        payload: [
          {
            id: '5bcafde29600021147742e3a',
            title: 'Aircraft Engine Icing Event Avoidance and Mitigation',
            description: "Innovators at NASA's Glenn Research Center",
            imageUrl: 'https://technology.nasa.gov/test.jpg'
          }
        ]
      }
    ];

    store.dispatch(getPatents());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
