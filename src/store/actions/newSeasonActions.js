import * as actionTypes from './actionTypes';
import { db } from '../../config/firebase';
import { fetchSeason } from '../actions';

export const startNewSeason = () => dispatch => {
  dispatch({
    type: actionTypes.START_NEW_SEASON
  });
};

export const newSeasonStepBack = step => dispatch => {
  dispatch({
    type: actionTypes.NEW_SEASON_STEP_BACK,
    step: step
  });
};

export const setTrainingPlan = trainingPlan => dispatch => {
  dispatch({
    type: actionTypes.SET_TRAINING_PLAN,
    trainingPlan: trainingPlan
  });
};

export const setStartDate = date => dispatch => {
  dispatch({
    type: actionTypes.SET_START_DATE,
    startDate: date
  });
};

const exportNewSeason = (userId, template, trainingDays) => async dispatch => {
  db.ref(`/users/${userId}/ongoingSeason/`).set(
    {
      template: template,
      trainingDays: trainingDays
    },
    error => {
      if (error) {
        console.log(error);
      } else {
        dispatch(fetchSeason(userId));
      }
    }
  );
};

const mapDates = (trainingDays, date) => {
  const startDate = new Date(date);
  const datedTrainingDays = trainingDays.map((day, i) => {
    const nextDate = new Date(startDate);
    nextDate.setDate(startDate.getDate() + i);
    return { ...day, date: nextDate.toDateString() };
  });
  return datedTrainingDays;
};

export const confirmNewSeason = (template, startDate, userId) => dispatch => {
  db.ref(`/training-plans/${template}`).once('value', snapshot => {
    const trainingDays = snapshot.val().trainingDays;
    const datedTrainingDays = mapDates(trainingDays, startDate);
    dispatch(exportNewSeason(userId, template, datedTrainingDays));
    dispatch({
      type: actionTypes.CONFIRM_NEW_SEASON
    });
  });
};
