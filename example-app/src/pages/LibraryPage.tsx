import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search } from 'grommet-icons';
import { Box, Keyboard, TextInput } from 'grommet';

import { RootState } from '../reducers/rootReducer';
import { ErrorPage } from './ErrorPage';
import { LibrarySearchingContent } from '../components/LibrarySearchingContent/LibrarySearchingContent';
import { getLibraryContent } from '../actions';

export const LibraryPage: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const [isValid, setIsValid] = useState(true);
  const dispatch = useDispatch();
  const { libraryData, error } = useSelector<
    RootState,
    Reducers.LibraryReducerState
  >(state => state.libraryReducer);

  const handleEnterOnInput = useCallback(value => {
    if (!value) {
      setIsValid(false);

      return;
    }

    dispatch(getLibraryContent(value));
    setIsValid(true);
  }, []);

  return (
    <>
      <Box
        border={{
          color: `${isValid ? 'dark-2' : 'status-error'}`,
          size: 'xsmall'
        }}
        round='large'
        background={{ color: 'dark-2', opacity: 'strong' }}
        direction='row'
        align='center'
        pad={{ horizontal: 'small', vertical: 'xsmall' }}
        margin={{
          right: '20px'
        }}
      >
        <Search color='brand' />
        <Keyboard onEnter={() => handleEnterOnInput(value)}>
          <TextInput
            value={value}
            onChange={event => setValue(event.target.value)}
            plain
            placeholder='Search for ... (e.g. "Mars")'
          />
        </Keyboard>
      </Box>
      {error ? (
        <ErrorPage optionalMessage={error} />
      ) : (
        <LibrarySearchingContent content={libraryData} />
      )}
    </>
  );
};
