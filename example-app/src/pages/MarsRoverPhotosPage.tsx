import React, { useEffect } from 'react';
import { Box } from 'grommet';
import { useDispatch, useSelector } from 'react-redux';

import { nasaService } from '../services/NasaService';
import { getMarsRoverPhotos } from '../actions';
import { RootState } from '../reducers/rootReducer';
import { MarsRoverPhotosReducerState } from '../reducers/marsRoverPhotosReducer';
import { Loader } from '../components/Loader/Loader';
import { ErrorPage } from './ErrorPage';

export const MarsRoverPhotosPage = () => {
  const dispatch = useDispatch();
  const { shouldPhotosDataUpdate, photosData, error, loading } = useSelector<
    RootState,
    MarsRoverPhotosReducerState
  >(state => state.marsRoverPhotosReducer);

  useEffect(() => {
    if (shouldPhotosDataUpdate) {
      dispatch(getMarsRoverPhotos(nasaService))
    }
  }, []);

  if (loading) {
    return <Loader/>
  }

  return error ? <ErrorPage optionalMessage={error}/> : (
    <Box
      as='ul'
      flex={true}
      direction='row'
      wrap={true}
      justify='around'
      pad='none'
    >
      {photosData.map(({ id, imageUrl }: Global.MarsRoverPhotoDataShape) => (
        <Box
          key={id}
          as='li'
          margin='medium'
          width='300px'
          height='200px'
          background={{
            image: `url('${imageUrl}')`,
            size: '100% 100%'
          }}
        />
      ))}
    </Box>
  );
};
