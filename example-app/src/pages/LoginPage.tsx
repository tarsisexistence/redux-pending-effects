import React  from 'react';
import { Box, Button } from 'grommet';

import { LoginForm } from '../components/LoginForm/LoginForm';

export const LoginPage: React.FC = () => (
  <>
    <Box flex={true} direction='row' margin='medium' justify='center'>
      <Button primary label='Sign in' color='accent-1' margin={{right: 'medium'}}/>
      <Button primary label='Sign up' color='accent-2'/>
    </Box>
    <LoginForm/>
  </>
);
