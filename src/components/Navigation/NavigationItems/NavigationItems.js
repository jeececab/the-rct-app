import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/account" exact>My Account</NavigationItem>
    <NavigationItem link="/season">Season</NavigationItem>
    <NavigationItem link="/welcome">Log Out</NavigationItem>
  </ul>
);

export default navigationItems;