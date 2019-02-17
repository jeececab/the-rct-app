import React from 'react';
import classes from './ExercisesList.module.css';
import _ from 'lodash'
import ExerciseItem from './ExerciseItem/ExerciseItem';

const ExercisesList = props => {
  const { day } = props;

  let exercises = <h3>Enjoy your rest day!</h3>;

  if (day.exercises) {
    exercises = _.map(day.exercises, (exer, exerId) => {
      return (
        <ExerciseItem
          key={exerId}
          id={exerId}
          exerciseTitle={exer.title}
          phase={exer.type === 'primary' ? day.phase : 'secondary'}
        />
      );
    });
  }

  return <ul className={classes.ExercisesList}>{exercises}</ul>;
};

export default ExercisesList;
