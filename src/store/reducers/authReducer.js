import * as actionTypes from "../actions/actionTypes";

const INITIAL_STATE = {
  authUser: false,
  error: null,
  loading: false,
  pwResetSent: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER:
      return {
        ...state,
        authUser: action.authUser || null,
        error: null
      };
    case actionTypes.AUTH_START:
      return {
        ...state,
        error: null,
        loading: true
      }
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        pwResetSent: true
      }
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false
      }
    default:
      return state;
  }
};