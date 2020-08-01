import React, { useEffect } from 'react';
import { Box, Heading, Paragraph, Image } from 'grommet';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../reducers/rootReducer';
import { ErrorPage } from './ErrorPage';
import { getAstronomyPictureData } from '../actions';

export const AstronomyPicturePage = () => {
  const dispatch = useDispatch();
  const {
    astronomyPictureData,
    error,
    shouldAstronomyPictureDataUpdate
  } = useSelector<
    RootState,
    Reducers.AstronomyPictureReducerState
  >(state => state.astronomyPictureReducer);

  useEffect(() => {
    if (shouldAstronomyPictureDataUpdate) {
      dispatch(getAstronomyPictureData)
    }
  }, []);

  return error ? (
    <ErrorPage optionalMessage={error} />
  ) : (
    <Box align='center'>
      <Heading level='2' textAlign='center'>
        Astronomy Picture of the Day
      </Heading>
      <Heading level='3'>
        {astronomyPictureData?.title}
      </Heading>
      <Box height='medium' width='large'>
        <Image
          fit='cover'
          src={astronomyPictureData?.imageUrl}
        />
      </Box>
      <Paragraph fill={true}>
        {astronomyPictureData?.description}
      </Paragraph>
    </Box>
  );
};
