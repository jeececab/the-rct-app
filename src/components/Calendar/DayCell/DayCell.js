import React from 'react';
import classes from './DayCell.module.css';

const DayCell = props => {
  return (
    <li
      className={[
        classes.DayCell,
        classes[props.phase],
        classes[props.titleStyle]
      ].join(' ')}
      id={props.id}
      onClick={props.clicked}
      title={props.dayDate}
    >
        <p className={classes.DateNb}>{props.dayDate.split(' ')[2]}</p>
        {props.children}
    </li>
  );
};

export default DayCell;
