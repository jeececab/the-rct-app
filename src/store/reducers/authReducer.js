import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
  authUser: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER:
      return {
        ...state,
        authUser: action.authUser || null
      };
    default:
      return state;
  }
};
