import * as actionTypes from '../actions/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_DAYS:
      return action.payload;
    default:
      return state;
  }
};
