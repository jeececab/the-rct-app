import { daysRef, authRef } from '../../config/firebase';
import { FETCH_DAYS, FETCH_USER } from './types';

// SEASON ACTIONS
export const addDay = newDay => async () => {
  daysRef.push().set(newDay);
};

export const deleteDay = deleteDayId => async () => {
  daysRef.child(deleteDayId).remove();
};

export const fetchDays = () => async dispatch => {
  daysRef.on('value', snapshot => {
    dispatch({
      type: FETCH_DAYS,
      payload: snapshot.val()
    });
  });
};

// AUTH ACTIONS

export const fetchUser = () => dispatch => {
  authRef.onAuthStateChanged(user => {
    if (user) {
      dispatch({
        type: FETCH_USER,
        payload: user
      });
    } else {
      dispatch({
        type: FETCH_USER,
        payload: null
      });
    }
  });
};

export const signIn = (email, password) => dispatch => {
  authRef
    .signInWithEmailAndPassword(email, password)
    .then(result => {
      console.log(result.user.uid)
    })
    .catch(error => {
      console.log(error);
    });
};

export const signUp = (email, password) => dispatch => {
  authRef
    .createUserWithEmailAndPassword(email, password)
    .then(result => {
      console.log(result.user.uid)
       // Create a user in your Firebase realtime database
      /* return this.props.firebase.user(authUser.user.uid).set({
        username,
        email
      }); */
    })
    .catch(error => {
      console.log(error)
    })
}

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