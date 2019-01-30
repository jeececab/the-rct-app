import { authRef, db } from '../../config/firebase';
import * as actionTypes from './actionTypes';
import { requestStart, requestSuccess, requestFail } from './requestActions';

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

export const resetPassword = email => dispatch => {
  dispatch(requestStart());

  authRef
    .sendPasswordResetEmail(email)
    .then(() => {
      dispatch(requestSuccess());
    })
    .catch(error => {
      dispatch(requestFail(error));
    });
};

export const signOut = () => dispatch => {
  dispatch(requestStart());

  authRef
    .signOut()
    .then(() => {
      dispatch(requestSuccess());
    })
    .catch(error => {
      dispatch(requestFail(error));
    });
};
