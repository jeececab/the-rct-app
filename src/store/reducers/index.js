import { combineReducers } from 'redux';

import season from './seasonReducer';
import auth from './authReducer';
import request from './requestReducer';

export default combineReducers({
  season,
  auth,
  request
});
