import { db } from '../../config/firebase';
import * as actionTypes from './actionTypes';
import {
  requestStart,
  requestSuccess,
  requestFail,
} from '../actions';

export const fetchSeason = userId => dispatch => {
  dispatch(requestStart());
  db.ref(`/users/${userId}/ongoingSeason/`).once('value', snapshot => {
    if (snapshot) {
      dispatch(requestSuccess());
      dispatch({
        type: actionTypes.FETCH_SEASON,
        ongoingSeason: snapshot.val()
      });
    } else {
      console.log('Failed to load content from the database');
      dispatch(requestFail('Failed to load content from the database'));
    }
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
