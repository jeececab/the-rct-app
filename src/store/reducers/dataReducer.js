import { FETCH_DAYS } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_DAYS:
      return action.payload;
    default:
      return state;
  }
};