import { authRef, db } from '../../config/firebase';
import * as actionTypes from './actionTypes';

export const fetchUser = () => dispatch => {
  authRef.onAuthStateChanged(user => {
    if (user) {
      dispatch({
        type: actionTypes.FETCH_USER,
        data: user
      });
    } else {
      dispatch({
        type: actionTypes.FETCH_USER,
        data: null
      });
    }
  });
};

export const signIn = (email, password) => dispatch => {
  authRef
    .signInWithEmailAndPassword(email, password)
    .then(result => {
      console.log(result.user.uid);
    })
    .catch(error => {
      dispatch({
        type: actionTypes.AUTH_FAIL,
        error: error
      });
    });
};

export const signUp = (email, password, username) => dispatch => {
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
      dispatch({
        type: actionTypes.AUTH_FAIL,
        error: error
      });
    });
};

export const signOut = () => dispatch => {
  authRef
    .signOut()
    .then(() => {
      // Sign-out successful.
    })
    .catch(error => {
      console.log(error);
    });
};

export const passwordForget = email => dispatch => {
  authRef
    .sendPasswordResetEmail(email)
    .then(() => {})
    .catch(error => {
      dispatch({
        type: actionTypes.AUTH_FAIL,
        error: error
      });
    });
};
