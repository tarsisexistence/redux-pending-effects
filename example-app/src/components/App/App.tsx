import React from 'react';
import { Switch, Route } from 'react-router';

import { Header } from '../Header/Header';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';
import { PatentsPage } from '../../pages/PatentsPage';
import { LibraryPage } from '../../pages/LibraryPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { ROUTES } from '../../utils/routes';

import styles from './App.module.scss';

export const App: React.FC = () => (
  <div className={styles.container}>
    <Header/>
    <Switch>
      <Route path={ROUTES.HOME} exact component={HomePage}/>
      <Route path={ROUTES.LOGIN} component={LoginPage}/>
      <Route path={ROUTES.PATENTS} component={PatentsPage}/>
      <Route path={ROUTES.LIBRARY} component={LibraryPage}/>
      <Route path={ROUTES.DASHBOARD} component={DashboardPage}/>
    </Switch>
  </div>
);
