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
    >
        <p className={classes.DayCellDate}>{props.dayDate}</p>
        {props.children}
    </li>
  );
};

export default DayCell;
