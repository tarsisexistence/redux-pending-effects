import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from '../../store';
import { App } from '../App/App';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';

export const AppContainer = () => (
  <Provider store={store}>
    <ErrorBoundary>
      <HashRouter>
        <App />
      </HashRouter>
    </ErrorBoundary>
  </Provider>
);