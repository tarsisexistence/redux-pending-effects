import React from 'react';
import { Heading, Paragraph } from 'grommet';

export const HomePage: React.FC = () => (
  <React.Fragment>
    <Heading level={2} size='24px'>
      Example Application
    </Heading>
    <Paragraph fill={true}>
      This is the place where experiments conducted and shows how to use this
      library in a real-world application.
    </Paragraph>
  </React.Fragment>
);
