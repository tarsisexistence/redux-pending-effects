import React from 'react';
import { Heading, Paragraph } from 'grommet';

export const DashboardPage: React.FC  = () => (
  <>
    <Heading level={2} size='24px'>
      Welcome to your Dashboard, Test!
    </Heading>
    <Paragraph fill={true}>
      Here you can see all your liked photos
    </Paragraph>
  </>
);