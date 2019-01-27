import { combineReducers } from 'redux';

import season from './seasonReducer';
import auth from './authReducer';

export default combineReducers({
  season,
  auth
});
