import { authRef, db } from '../../config/firebase';
import * as actionTypes from './actionTypes';

export const fetchUser = () => dispatch => {
  authRef.onAuthStateChanged(user => {
    if (user) {
      dispatch({
        type: actionTypes.FETCH_USER,
        authUser: user
      });
    } else {
      dispatch({
        type: actionTypes.FETCH_USER,
        authUser: null
      });
    }
  });
};

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = () => {
  return {
    type: actionTypes.AUTH_SUCCESS
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const signIn = (email, password) => dispatch => {
  dispatch(authStart());

  authRef
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      dispatch(authSuccess());
    })
    .catch(error => {
      dispatch(authFail(error));
    });
};

export const signUp = (email, password, username) => dispatch => {
  dispatch(authStart());

  authRef
    .createUserWithEmailAndPassword(email, password)
    .then(result => {
      // Create a user in your Firebase realtime database
      db.ref('users/' + result.user.uid).set({
        username,
        email
      });
    })
    .catch(error => {
      dispatch(authFail(error));
    });
};

export const resetPassword = email => dispatch => {
  dispatch(authStart());

  authRef
    .sendPasswordResetEmail(email)
    .then(() => {
      dispatch(authSuccess());
    })
    .catch(error => {
      dispatch(authFail(error));
    });
};

export const signOut = () => dispatch => {
  dispatch(authStart());

  authRef
    .signOut()
    .then(() => {
      dispatch(authSuccess());
    })
    .catch(error => {
      dispatch(authFail(error));
    });
};
