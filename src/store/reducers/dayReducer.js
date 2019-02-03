import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
  openedDay: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.GET_DAY:
      return {
        ...state,
        openedDay: action.openedDay
      };
    default:
      return state;
  }
};
