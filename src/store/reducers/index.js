import { combineReducers } from 'redux';

import request from './requestReducer';
import auth from './authReducer';
import newSeason from './newSeasonReducer';
import season from './seasonReducer';
import day from './dayReducer';

export default combineReducers({
  request,
  auth,
  newSeason,
  season,
  day
});
