import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsPending } from 'redux-pending-effects';
import { Routes, Route } from 'react-router-dom';
import { Grommet, Box } from 'grommet';

import { Header } from '../Header/Header';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';
import { PatentsPage } from '../../pages/PatentsPage';
import { LibraryPage } from '../../pages/LibraryPage';
import { AstronomyPicturePage } from '../../pages/AstronomyPicturePage';
import { DashboardPage } from '../../pages/DashboardPage';
import { theme } from '../../theme';
import { Loader } from '../Loader/Loader';
import { routes } from '../../constants';

export const App: React.FC = () => {
  const isPending = useSelector(selectIsPending);

  return (
    <Grommet theme={ theme }>
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
        <Routes>
          <Route path={ routes.HOME } element={ <HomePage/> }/>
          <Route path={ routes.LOGIN } element={ <LoginPage/> }/>
          <Route path={ routes.PATENTS } element={ <PatentsPage/> }/>
          <Route path={ routes.LIBRARY } element={ <LibraryPage/> }/>
          <Route path={ routes.ASTRONOMY_PICTURE } element={ <AstronomyPicturePage/> }/>
          <Route path={ routes.DASHBOARD } element={ <DashboardPage/> }/>
        </Routes>
        </Box>
      }
    </Grommet>
  );
};
