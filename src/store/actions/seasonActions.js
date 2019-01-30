import { db } from '../../config/firebase';
import * as actionTypes from './actionTypes';
import { requestStart, requestSuccess, requestFail } from './requestActions';

export const fetchSeason = userId => async dispatch => {
  dispatch(requestStart());
  db.ref(`/users/${userId}/ongoingSeason/`).once('value', snapshot => {
    if (snapshot.exists()) {
      dispatch({
        type: actionTypes.FETCH_SEASON,
        ongoingSeason: snapshot.val()
      });
      dispatch(requestSuccess());
    } else {
      console.log('Failed to load content from the database');
      dispatch(requestFail('Failed to load content from the database'));
    }
  });
};

export const fetchTrainingPlan = type => async dispatch => {
  db.ref(`/training-plans/${type}`).once('value', snapshot => {
    dispatch({
      type: actionTypes.FETCH_TRAINING_PLAN,
      trainingPlan: snapshot.val()
    });
  });
};

/* import { daysRef } from '../../config/firebase';
import * as actionTypes from './actionTypes';

export const addDay = newDay => async () => {
  daysRef.push().set(newDay);
};

export const deleteDay = deleteDayId => async () => {
  daysRef.child(deleteDayId).remove();
};

 */
