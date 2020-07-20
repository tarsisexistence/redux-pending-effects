import React from 'react';
import { Box, TextInput } from 'grommet';
import { Search } from 'grommet-icons';

export const LibraryPage: React.FC = () => {
  const [value, setValue] = React.useState('');

  return (
    <Box
      round='large'
      background={{ color: 'dark-2', opacity: 'strong' }}
      direction='row'
      align='center'
      pad={{ horizontal: 'small', vertical: 'xsmall' }}
      margin='medium'
    >
      <Search color='brand' />
      <TextInput
        plain
        placeholder='Search for ... (e.g. "Mars")'
        value={value}
        onChange={event => setValue(event.target.value)}
      />
    </Box>
  );
};