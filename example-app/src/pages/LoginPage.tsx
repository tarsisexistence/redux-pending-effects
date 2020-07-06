import React  from 'react';

import {LoginForm} from '../components/LoginForm/LoginForm';
import { Box, Button } from 'grommet';

export const LoginPage: React.FC = () => {
  return (
    <>
      <Box flex={true} direction='row' margin='medium' justify='center'>
        <Button primary label='Sign in' color='accent-1' margin={{right: 'medium'}}/>
        <Button primary label='Sign up' color='accent-2'/>
      </Box>
      <LoginForm/>
    </>
  );
};
