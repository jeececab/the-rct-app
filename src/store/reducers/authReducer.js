import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
  authUser: false,
  pwResetSuccess: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER:
      return {
        ...state,
        authUser: action.authUser || null,
      };
    case actionTypes.SEND_PWRESET:
      return {
        ...state,
        pwResetSuccess: true
      }
    case actionTypes.CLEAR_PWRESET:
      return {
        ...state,
        pwResetSuccess: false
      }
    default:
      return state;
  }
};
