import React from 'react';
import classes from './Backdrop.module.css';

const backdrop = props => {
  let attachedClasses = [classes.Backdrop];

  if (props.sideDrawer) {
    attachedClasses = [classes.Backdrop, classes.SideDrawerMode];
  }

  return props.show ? (
    <div className={attachedClasses.join(' ')} onClick={props.clicked} />
  ) : null;
};

export default backdrop;
