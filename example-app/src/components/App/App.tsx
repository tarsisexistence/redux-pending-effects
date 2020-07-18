import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsPending } from 'redux-pending-effects';
import { Switch, Route } from 'react-router';
import { Grommet, Box } from 'grommet';

import { Header } from '../Header/Header';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';
import { PatentsPage } from '../../pages/PatentsPage';
import { LibraryPage } from '../../pages/LibraryPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { theme } from '../../theme';
import { Loader } from '../Loader/Loader';
import { routes } from '../../constants';

export const App: React.FC = () => {
  const isPending = useSelector(selectIsPending);

  return (
    <Grommet theme={theme}>
      <Header/>
      {
        isPending ? <Loader/> : <Box
          as='section'
          margin={{
            "top": "30px",
            "bottom": "15px",
            "horizontal": "30px"
          }}
        >
          <Switch>
            <Route path={routes.HOME} exact component={HomePage}/>
            <Route path={routes.LOGIN} component={LoginPage}/>
            <Route path={routes.PATENTS} component={PatentsPage}/>
            <Route path={routes.LIBRARY} component={LibraryPage}/>
            <Route path={routes.DASHBOARD} component={DashboardPage}/>
          </Switch>
        </Box>
      }
    </Grommet>
  );
};
