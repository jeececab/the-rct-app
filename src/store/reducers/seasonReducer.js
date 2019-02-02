import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
  ongoingSeason: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SEASON:
      return {
        ...state,
        ongoingSeason: action.ongoingSeason
      };
    case actionTypes.INIT_SEASON:
      return {
        ...state,
        ...INITIAL_STATE
      };
    default:
      return state;
  }
};
