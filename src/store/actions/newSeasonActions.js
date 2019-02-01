import * as actionTypes from './actionTypes';

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
