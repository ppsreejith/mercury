import { combineReducers } from 'redux';

import test from './test';
import buses from './buses';
import locations from './locations';

export default combineReducers({
  test,
  buses,
  locations
});
