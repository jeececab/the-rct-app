import * as actionTypes from './actionTypes';
import { db } from '../../config/firebase';
import {
  requestStart,
  requestSuccess,
  requestFail,
  fetchSeason
} from '../actions';

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

export const setSeasonTitle = title => dispatch => {
  dispatch({
    type: actionTypes.SET_SEASON_TITLE,
    title: title
  })
}

const exportNewSeason = (userId, template, trainingDays, title) => dispatch => {
  dispatch(requestStart())
  db.ref(`/users/${userId}/ongoingSeason/`).set(
    {
      template: template,
      trainingDays: trainingDays,
      title: title
    },
    error => {
      if (error) {
        dispatch(requestFail('Failed to save data on the database'))
        console.log(error);
      } else {
        dispatch(fetchSeason(userId));
        dispatch(requestSuccess())
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

export const confirmNewSeason = (template, startDate, userId, title) => dispatch => {
  db.ref(`/training-plans/${template}`).once('value', snapshot => {
    const trainingDays = snapshot.val().trainingDays;
    const datedTrainingDays = mapDates(trainingDays, startDate);
    dispatch(exportNewSeason(userId, template, datedTrainingDays, title));
    dispatch({
      type: actionTypes.CONFIRM_NEW_SEASON
    });
  });
};
