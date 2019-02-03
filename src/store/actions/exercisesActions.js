import { db } from '../../config/firebase';
import * as actionTypes from './actionTypes';

export const fetchExercises = () => dispatch => {
  db.ref(`/exercises/`).once('value', snapshot => {
    if (snapshot) {
      dispatch({
        type: actionTypes.FETCH_EXERCISES,
        exercises: snapshot.val()
      });
    } else {
      console.log('Failed to load content from the database');
    }
  });
};
