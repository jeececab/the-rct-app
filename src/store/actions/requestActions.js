import * as actionTypes from './actionTypes';

export const requestStart = () => {
  return {
    type: actionTypes.REQUEST_START
  };
};

export const requestSuccess = () => {
  return {
    type: actionTypes.REQUEST_SUCCESS
  };
};

export const requestFail = error => {
  return {
    type: actionTypes.REQUEST_FAIL,
    error: error
  };
};

export const clearError = error => dispatch => {
  if (error !== null) {
    dispatch({
      type: actionTypes.CLEAR_ERROR
    });
  }
};
