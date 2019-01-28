import { combineReducers } from 'redux';

import request from './requestReducer';
import auth from './authReducer';
import newSeason from './newSeasonReducer';
import season from './seasonReducer';

export default combineReducers({
  request,
  auth,
  newSeason,
  season
});
