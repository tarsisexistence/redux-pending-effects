import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Heading, Anchor } from 'grommet';

import { ROUTES } from '../../utils/routes';
import { NavList } from '../NavList/NavList';
import { CustomMenu } from '../CustomMenu/CustomMenu';

export const Header: React.FC = () => {
  return (
    <Box
      tag='header'
      background='accent-4'
      pad='small'
      elevation='xsmall'
      responsive={true}
    >
      <Box
        tag='nav'
        justify='between'
        direction='row'
        align='center'
      >
        <Heading level={1} size='28px' margin='none'>
          <Link to={ROUTES.HOME}>
            <Anchor as='strong' label='Redux Pending Effects' color='neutral-1'/>
          </Link>
        </Heading>
        <CustomMenu
          dropProps={{
            elevation: 'none',
            align: { right: "right", top: "top" }
          }}
          items={[
            { label: <NavList/>}
          ]}
          iconColorOnHover='neutral-1'
        />
      </Box>
    </Box>
  );
};
