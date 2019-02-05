import React from 'react';
import classes from './ExercisesList.module.css';
import ExerciseItem from './ExerciseItem/ExerciseItem';

const ExercisesList = props => {
  const { day } = props;

  let primaryExercises, secondaryExercises;

  if (day.primaryExercises) {
    primaryExercises = day.primaryExercises.map(exer => {
      return (
        <ExerciseItem
          key={exer}
          exerciseID={exer}
          type="PrimaryExercise"
          phase={day.phase}
        />
      );
    });
  }

  if (day.secondaryExercises) {
    secondaryExercises = day.secondaryExercises.map(exer => {
      return (
        <ExerciseItem
          key={exer}
          exerciseID={exer}
          type="SecondaryExercise"
          phase="secondary"
        />
      );
    });
  }

  return (
    <ul className={classes.ExercisesList}>
      {primaryExercises}
      {secondaryExercises}
    </ul>
  );
};

export default ExercisesList;
