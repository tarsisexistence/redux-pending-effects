import React from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';
import { Anchor, Box } from 'grommet';

import styles from './NavList.module.scss';

type NavLinkProps = {
  to: string,
  label: string,
  exact?: boolean
}

const navLinkProps: NavLinkProps[] = [
  {
    to: ROUTES.HOME,
    exact: true,
    label: 'Home'
  },
  {
    to: ROUTES.LOGIN,
    label: 'Login'
  },
  {
    to: ROUTES.PATENTS,
    label: 'NASA Patents'
  },
  {
    to: ROUTES.LIBRARY,
    label: 'NASA Library'
  },
  {
    to: ROUTES.DASHBOARD,
    label: 'Dashboard'
  }
];

export const NavList: React.FC = () => {
  return (
    <Box
      tag='ul'
      pad='small'
      justify='between'
      direction='column'
    >
      {
        navLinkProps.map(({label, ...rest}) => (
          <li key={label}>
            <NavLink {...rest} activeClassName={styles.navListItemActiveLink}>
              <Anchor as='span' label={label} size='xlarge'/>
            </NavLink>
          </li>
        ))
      }
    </Box>
  );
};
