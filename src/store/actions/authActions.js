import { authRef, db } from '../../config/firebase';
import * as actionTypes from './actionTypes';
import {
  requestStart,
  requestSuccess,
  requestFail,
  initSeason,
  fetchSeason,
  fetchExercises
} from '../actions';

export const fetchUser = () => dispatch => {
  dispatch(requestStart());
  authRef.onAuthStateChanged(user => {
    if (user) {
      dispatch({
        type: actionTypes.FETCH_USER,
        authUser: user
      });
      dispatch(fetchSeason(user.uid))
      dispatch(fetchExercises());
      dispatch(requestSuccess());
    } else {
      dispatch({
        type: actionTypes.FETCH_USER,
        authUser: null
      });
      dispatch(requestSuccess());
    }
  });
};

export const signIn = (email, password) => dispatch => {
  dispatch(requestStart());
  authRef
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      dispatch(requestSuccess());
    })
    .catch(error => {
      dispatch(requestFail(error));
    });
};

export const signUp = (email, password, username) => dispatch => {
  dispatch(requestStart());
  authRef
    .createUserWithEmailAndPassword(email, password)
    .then(result => {
      dispatch(requestSuccess());
      db.ref('users/' + result.user.uid).set({
        username,
        email,
        ongoingSeason: false
      });
    })
    .catch(error => {
      dispatch(requestFail(error));
    });
};

export const sendPWreset = email => dispatch => {
  dispatch(requestStart());
  authRef
    .sendPasswordResetEmail(email)
    .then(() => {
      dispatch(requestSuccess());
      dispatch({
        type: actionTypes.SEND_PWRESET
      });
    })
    .catch(error => {
      dispatch(requestFail(error));
    });
};

export const clearPWreset = () => dispatch => {
  dispatch({
    type: actionTypes.CLEAR_PWRESET
  })
}

export const signOut = () => dispatch => {
  dispatch(requestStart());
  authRef
    .signOut()
    .then(() => {
      dispatch(initSeason());
      dispatch(requestSuccess());
    })
    .catch(error => {
      dispatch(requestFail(error));
    });
};
