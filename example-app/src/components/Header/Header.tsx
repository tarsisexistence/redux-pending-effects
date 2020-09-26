import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Heading, Anchor } from 'grommet';

import { NavList } from '../NavList/NavList';
import { CustomMenu } from '../CustomMenu/CustomMenu';
import { routes } from '../../constants';

export const Header: React.FC = () => (
  <Box
    background='accent-4'
    elevation='xsmall'
    pad='small'
    responsive={true}
    tag='header'
  >
    <Box align='center' direction='row' justify='between' tag='nav'>
      <Heading level={1} margin='none' size='28px'>
        <Link to={routes.HOME}>
          <Anchor as='strong' color='neutral-1' label='Redux Pending Effects' />
        </Link>
      </Heading>
      <CustomMenu
        dropProps={{
          elevation: 'none',
          align: { right: 'right', top: 'top' }
        }}
        iconColorOnHover='neutral-1'
        items={[{ label: <NavList /> }]}
      />
    </Box>
  </Box>
);
