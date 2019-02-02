import React from 'react';
import classes from './Day.module.css';

const Day = props => {
  return (
    <li className={classes.Day} key={props.key} onClick={props.clicked}>
      {props.children}
    </li>
  );
};

export default Day;
