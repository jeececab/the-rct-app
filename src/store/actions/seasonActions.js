import { db } from '../../config/firebase'
import * as actionTypes from './actionTypes';

export const fetchSeason = userId => async dispatch => {
  db.ref(`/users/${userId}/ongoingSeason/`).on('value', snapshot => {
    dispatch({
      type: actionTypes.FETCH_SEASON,
      ongoingSeason: snapshot.val() || null
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