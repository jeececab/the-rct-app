import { db } from '../../config/firebase'
import * as actionTypes from './actionTypes';

export const fetchSeason = userId => async dispatch => {
  db.ref(`/users/${userId}/ongoingSeason/`).once('value', snapshot => {
    dispatch({
      type: actionTypes.FETCH_SEASON,
      ongoingSeason: snapshot.val() || null
    });
  });
};

export const fetchTrainingPlan = type => async dispatch => {
  db.ref(`/training-plans/${type}`).once('value', snapshot => {
    dispatch({
      type: actionTypes.FETCH_SEASON,
      ongoingSeason: snapshot.val() || 'custom'
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