import { db } from '../../config/firebase';
import * as actionTypes from './actionTypes';

export const fetchSeason = userId => dispatch => {
  db.ref(`/users/${userId}/ongoingSeason/`).once('value', snapshot => {
    if (snapshot) {
      dispatch({
        type: actionTypes.FETCH_SEASON,
        ongoingSeason: snapshot.val()
      });
    } else {
      console.log('Failed to load content from the database');
    }
  });
};

export const initSeason = () => dispatch => {
  dispatch({
    type: actionTypes.INIT_SEASON
  });
};

/*

export const addDay = newDay => async () => {
  daysRef.push().set(newDay);
};

export const deleteDay = deleteDayId => async () => {
  daysRef.child(deleteDayId).remove();
};

 */
