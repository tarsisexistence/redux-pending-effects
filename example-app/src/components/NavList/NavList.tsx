import React from 'react';
import { NavLink } from 'react-router-dom';
import { Anchor, Box } from 'grommet';

import styles from './NavList.module.scss';
import { routes } from '../../constants';

type NavLinkProps = {
  to: string;
  label: string;
  end?: boolean;
};

const navLinkProps: NavLinkProps[] = [
  {
    to: routes.HOME,
    label: 'Home',
    end: true
  },
  {
    to: routes.PATENTS,
    label: 'NASA Patents'
  },
  {
    to: routes.LIBRARY,
    label: 'NASA Library'
  },
  {
    to: routes.ASTRONOMY_PICTURE,
    label: 'APOD'
  },
  {
    to: routes.MARS_ROVER_PHOTOS,
    label: 'Mars Rover Photos'
  }
];

export const NavList: React.FC = () => {
  const handleNavLinkClassName: (props: { isActive: boolean }) => string =
    React.useCallback(
      ({ isActive }) => (isActive ? styles.navListItemActiveLink : ''),
      []
    );

  return (
    <Box direction='column' justify='between' pad='small' tag='ul'>
      {navLinkProps.map(({ label, ...rest }) => (
        <li key={label}>
          <NavLink {...rest} className={handleNavLinkClassName}>
            <Anchor as='span' label={label} size='xlarge' />
          </NavLink>
        </li>
      ))}
    </Box>
  );
};
