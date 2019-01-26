import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import * as ROUTES from '../../../constants/routes';
// import SignOutButton from '../../SignOutButton/SignOutButton';

const navigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link={ROUTES.ACCOUNT} exact>My Account</NavigationItem>
    <NavigationItem link={ROUTES.SEASON}>Season</NavigationItem>
  </ul>
);

export default navigationItems;