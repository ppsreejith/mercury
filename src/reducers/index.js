import { combineReducers } from 'redux';

import test from './test';
import vehicles from './vehicles';
import locations from './locations';
import trip from './trip';

export default combineReducers({
  test,
  vehicles,
  locations,
  trip
});
