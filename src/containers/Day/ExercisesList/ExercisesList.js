import React from 'react';
import classes from './ExercisesList.module.css';
import ExerciseItem from './ExerciseItem/ExerciseItem';

const ExercisesList = props => {
  const { day } = props;
 
  const primaryExercises = day.primaryExercises.map(exer => {
    return <ExerciseItem key={exer} exercise={exer} type="primaryExercise" />;
  });

  const secondaryExercises = day.secondaryExercises.map(exer => {
    return <ExerciseItem key={exer} exercise={exer} type="secondaryExercise" />;
  });

  return (
    <ul className={classes.ExercisesList}>
      {primaryExercises}
      {secondaryExercises}
    </ul>
  );
};

export default ExercisesList;
