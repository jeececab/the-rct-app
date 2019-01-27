import { daysRef } from '../../config/firebase';
import * as actionTypes from './actionTypes';

export const addDay = newDay => async () => {
  daysRef.push().set(newDay);
};

export const deleteDay = deleteDayId => async () => {
  daysRef.child(deleteDayId).remove();
};

export const fetchDays = () => async dispatch => {
  daysRef.on('value', snapshot => {
    dispatch({
      type: actionTypes.FETCH_DAYS,
      payload: snapshot.val()
    });
  });
};