import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
  newSeasonStep: null,
  startDate: null,
  startingNewSeason: false,
  trainingPlan: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.START_NEW_SEASON:
      return {
        ...state,
        startingNewSeason: true
      };
    case actionTypes.ABORT_NEW_SEASON:
      return {
        ...state,
        ...INITIAL_STATE
      };
    case actionTypes.SET_TRAINING_PLAN:
      return {
        ...state,
        trainingPlan: action.trainingPlan,
        newSeasonStep: 'step2'
      }
    case actionTypes.SET_START_DATE:
      return {
        ...state,
        startDate: action.startDate,
        newSeasonStep: 'step3'
      };
    default:
      return state;
  }
};
