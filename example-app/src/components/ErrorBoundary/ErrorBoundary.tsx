import React from 'react';

import { ErrorPage } from '../../pages/ErrorPage';

export class ErrorBoundary extends React.Component<
  Record<string, unknown>,
  { hasError: boolean }
> {
  state = {
    hasError: false
  };

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({ hasError: true });
  }

  render() {
    return this.state.hasError ? <ErrorPage /> : this.props.children;
  }
}
