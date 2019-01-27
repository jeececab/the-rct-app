import { authRef, db } from '../../config/firebase';
import * as actionTypes from './actionTypes';
import * as actions from './requestActions'

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

export const signIn = (email, password) => dispatch => {
  dispatch(actions.requestStart());

  authRef
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      dispatch(actions.requestSuccess());
    })
    .catch(error => {
      dispatch(actions.requestFail(error));
    });
};

export const signUp = (email, password, username) => dispatch => {
  dispatch(actions.requestStart());

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
      dispatch(actions.requestFail(error));
    });
};

export const resetPassword = email => dispatch => {
  dispatch(actions.requestStart());

  authRef
    .sendPasswordResetEmail(email)
    .then(() => {
      dispatch(actions.requestSuccess());
    })
    .catch(error => {
      dispatch(actions.requestFail(error));
    });
};

export const signOut = () => dispatch => {
  dispatch(actions.requestStart());

  authRef
    .signOut()
    .then(() => {
      dispatch(actions.requestSuccess());
    })
    .catch(error => {
      dispatch(actions.requestFail(error));
    });
};
