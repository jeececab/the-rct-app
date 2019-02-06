import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
  error: null,
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.REQUEST_START:
      return {
        ...state,
        error: null,
        loading: true
      };
    case actionTypes.REQUEST_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false
      };
    case actionTypes.REQUEST_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    case actionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};
