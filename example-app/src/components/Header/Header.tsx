import React from 'react';
import {NavLink} from 'react-router-dom';

import {ROUTES} from '../../utils/routes';

import styles from  './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <ul>
        <NavLink to={ROUTES.HOME} activeClassName={'active-link'}>
          Home
        </NavLink>
        <NavLink to={ROUTES.LOGIN} activeClassName={'active-link'}>
          Login
        </NavLink>
        <NavLink to={ROUTES.PATENTS} activeClassName={'active-link'}>
          NASA Patents
        </NavLink>
        <NavLink to={ROUTES.LIBRARY} activeClassName={'active-link'}>
          NASA Library
        </NavLink>
        <NavLink to={ROUTES.DASHBOARD} activeClassName={'active-link'}>
          Dashboard
        </NavLink>
      </ul>
    </header>
  );
};
