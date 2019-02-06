import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
  exercises: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.FETCH_EXERCISES:
      return {
        ...state,
        exercises: action.exercises
      };
    default:
      return state;
  }
};
