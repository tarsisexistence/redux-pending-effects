import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsPending } from 'redux-pending-effects';
import { Routes, Route } from 'react-router-dom';
import { Grommet, Box } from 'grommet';

import { Header } from '../Header/Header';
import { HomePage } from '../../pages/HomePage';
import { PatentsPage } from '../../pages/PatentsPage';
import { LibraryPage } from '../../pages/LibraryPage';
import { AstronomyPicturePage } from '../../pages/AstronomyPicturePage';
import { theme } from '../../theme';
import { Loader } from '../Loader/Loader';
import { routes } from '../../constants';
import { MarsRoverPhotosPage } from '../../pages/MarsRoverPhotosPage';

export const App: React.FC = () => {
  const isPending = useSelector(selectIsPending);

  return (
    <Grommet theme={theme}>
      <Header />
      {isPending ? (
        <Loader />
      ) : (
        <Box
          as='section'
          margin={{
            top: '30px',
            bottom: '15px',
            horizontal: '30px'
          }}
        >
          <Routes>
            <Route element={<HomePage />} path={routes.HOME} />
            <Route element={<PatentsPage />} path={routes.PATENTS} />
            <Route element={<LibraryPage />} path={routes.LIBRARY} />
            <Route
              element={<AstronomyPicturePage />}
              path={routes.ASTRONOMY_PICTURE}
            />
            <Route
              element={<MarsRoverPhotosPage />}
              path={routes.MARS_ROVER_PHOTOS}
            />
          </Routes>
        </Box>
      )}
    </Grommet>
  );
};
