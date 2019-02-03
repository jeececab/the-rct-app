import React, { Component } from 'react';
import classes from './ExerciseItem.module.css';

class ExerciseItem extends Component {
  render() {
    const { exercise, type, clicked } = this.props;

    return (
      <li
        className={[classes.ExerciseItem, classes[type]].join(' ')}
        onClick={clicked}
      >
        {exercise}
      </li>
    );
  }
}

export default ExerciseItem;
