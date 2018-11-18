import { combineReducers } from 'redux';

import test from './test';
import vehicles from './vehicles';
import locations from './locations';

export default combineReducers({
  test,
  vehicles,
  locations
});
