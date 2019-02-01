import { db } from '../../config/firebase';
import * as actionTypes from './actionTypes';
import {
  requestStart,
  requestSuccess,
  requestFail,
  newSeasonStepBack
} from '../actions';

export const fetchSeason = userId => async dispatch => {
  dispatch(requestStart());
  db.ref(`/users/${userId}/ongoingSeason/`).once('value', snapshot => {
    if (snapshot.exists()) {
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

const exportNewSeason = (userId, template, trainingPlan) => dispatch => {
  db.ref(`/users/${userId}/ongoingSeason/`)
    .set({
      template: template,
      trainingDays: trainingPlan
    })
    .then(() => {
      db.ref(`/users/${userId}/ongoingSeason/trainingDays/`)
        .once('value')
        .then(() => {
          dispatch(fetchSeason(userId));
          dispatch(newSeasonStepBack(null));
        });
    });
};

export const mapDates = (snapshot, date) => {
  const startDate = new Date(date);
  const datedTrainingPlan = snapshot.val().trainingDays.map((day, i) => {
    const nextDate = new Date(startDate);
    nextDate.setDate(startDate.getDate() + i);
    return { ...day, date: nextDate.toDateString() };
  });
  return datedTrainingPlan
};

export const saveNewSeason = (template, date, userId) => dispatch => {
  dispatch(requestStart());
  db.ref(`/training-plans/${template}`).once('value', snapshot => {
    if (snapshot.exists()) {
      dispatch(requestSuccess());
      dispatch(exportNewSeason(userId, template, mapDates(snapshot, date)));
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
