import Immutable from 'immutable';
import { createReducer } from '../utils';
import routeData from '../utils/route-data.json';

const initialComfort = 0;

const initialState = Immutable.fromJS({
  comfort: initialComfort,
  routes: routeData[initialComfort]
});

const reducers = {
  TRIP_SET_TRIP: (state, { comfort, routes }) => Immutable.fromJS({ comfort, routes })
};

export default createReducer(initialState, reducers);
