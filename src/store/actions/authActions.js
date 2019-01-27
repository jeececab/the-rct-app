import { authRef } from '../../config/firebase';
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
      console.log(error);
    });
};

export const signUp = (email, password) => dispatch => {
  authRef
    .createUserWithEmailAndPassword(email, password)
    .then(result => {
      console.log(result.user.uid);
      // Create a user in your Firebase realtime database
      /* return this.props.firebase.user(authUser.user.uid).set({
        username,
        email
      }); */
    })
    .catch(error => {
      console.log(error);
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
      console.log(error);
    });
};
