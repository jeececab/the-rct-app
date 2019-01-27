import * as actionTypes from "../actions/actionTypes";

const INITIAL_STATE = {
  data: false,
  loading: false,
  error: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER:
      return {
        ...state,
        data: action.data || null,
        error: null
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        error: action.error
      }
    default:
      return state;
  }
};