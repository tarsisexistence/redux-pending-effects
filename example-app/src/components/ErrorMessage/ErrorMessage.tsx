import React from 'react';
import { Box, Paragraph } from 'grommet';

type ErrorMessageProps = {
  message: string
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({message}) => (
  <Box align='center' margin='large'>
    <Paragraph color='status-critical' margin='small' textAlign='center'>
      Ups... Something went wrong. Please, try again later.
    </Paragraph>
    <Paragraph color='status-critical' textAlign='center'>
      Error details: {message}
    </Paragraph>
  </Box>
);