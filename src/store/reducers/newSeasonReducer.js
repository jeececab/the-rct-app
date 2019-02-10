import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
  newSeasonStep: null,
  startDate: null,
  startingNewSeason: false,
  trainingPlan: null,
  title: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.START_NEW_SEASON:
      return {
        ...state,
        startingNewSeason: true
      };
    case actionTypes.NEW_SEASON_STEP_BACK:
      let newState;
      if (action.step === null) {
        newState = { ...INITIAL_STATE };
      } else if (action.step === 'step1') {
        newState = { trainingPlan: null, startDate: null, title: null };
      } else if (action.step === 'step2') {
        newState = { startDate: null };
      } else if (action.step === 'step3') {
        newState = { title: null };
      }
      return {
        ...state,
        ...newState,
        newSeasonStep: action.step
      };
    case actionTypes.SET_TRAINING_PLAN:
      return {
        ...state,
        trainingPlan: action.trainingPlan,
        newSeasonStep: 'step2'
      };
    case actionTypes.SET_START_DATE:
      return {
        ...state,
        startDate: action.startDate,
        newSeasonStep: 'step3'
      };
    case actionTypes.SET_SEASON_TITLE:
      return {
        ...state,
        title: action.title,
        newSeasonStep: 'step4'
      };
    case actionTypes.CONFIRM_NEW_SEASON:
      return {
        ...state,
        ...INITIAL_STATE
      };
    default:
      return state;
  }
};
