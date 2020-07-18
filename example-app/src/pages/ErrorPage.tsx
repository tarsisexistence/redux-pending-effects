import React from 'react';
import { Box, Paragraph } from 'grommet';

type ErrorPageProps = {
  optionalMessage?: string
}

export const ErrorPage: React.FC<ErrorPageProps> = ({ optionalMessage }) => (
  <Box align='center' margin='large'>
    <Paragraph color='status-critical' margin='small' textAlign='center'>
      Ups... Something went wrong. Please, try again later.
    </Paragraph>
    {
      optionalMessage ? <Paragraph color='status-critical' textAlign='center'>
        { optionalMessage }
      </Paragraph> : null
    }
  </Box>
);