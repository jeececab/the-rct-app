import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
  ongoingSeason: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SEASON:
      return {
        ...state,
        ongoingSeason: action.ongoingSeason
      };
    default:
      return state;
  }
};
