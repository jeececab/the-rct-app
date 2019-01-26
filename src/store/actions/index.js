
import { daysRef } from "../../config/firebase";
import { FETCH_DAYS } from "./types";

export const addDay = newDay => async dispatch => {
  daysRef.push().set(newDay);
};

export const deleteDay = deleteDayId => async dispatch => {
  daysRef.child(deleteDayId).remove();
};

export const fetchDays = () => async dispatch => {
  daysRef.on("value", snapshot => {
    dispatch({
      type: FETCH_DAYS,
      payload: snapshot.val()
    });
  });
};