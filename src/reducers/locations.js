import Immutable from 'immutable';
import { createReducer } from '../utils';
import _ from 'lodash';

const initialState = Immutable.fromJS({
  id: "5a59c467-28a8-44d2-87f7-9f8a8fe5513d",
  mm: 0,
  predictions: [],
  phases: [],
  isHaggling: false,
  isWaiting: false,
  origin: {
    latitude: 12.9593473,
    longitude: 77.64338450000001
  },
  selected: {
    /* coordinates: {
     *   lat: 12.9718154,
     *   lng: 77.60094
     * },*/
    description: "Truffles, Saint Marks Road, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka, India"
  }
});

const reducers = {
  LOCATIONS_RECEIVED: (state, { predictions }) => state.set('predictions', Immutable.fromJS(predictions)),
  LOCATION_SELECTED: (state, selected) => state.set('selected', Immutable.fromJS(_.extend({ comfort: state.getIn(['selected', 'comfort'], 1) }, selected))),
  LOCATION_SET_PHASE: (state, { phases }) => state.setIn(['phases'], Immutable.fromJS(phases)).set('isHaggling', false).set('isWaiting', false),
  LOCATION_UPDATE_PATH: (state) => {
    const nextPhase = state.getIn(['phases', 0]);
    const origin = nextPhase.get('origin');
    const destination = nextPhase.get('destination');
    const phases = state.get('phases').shift();
    return state.set('phases', phases).setIn(['selected', 'coordinates'], destination).setIn(['origin'], origin).set('isHaggling', false).set('isWaiting', false);
  },
  LOCATION_SET_WAITING: state => state.set('isWaiting', true).set('isHaggling', false),
  LOCATION_SET_HAGGLING: state => state.set('isHaggling', true),
  LOCATION_SET_TRIP: (state, trip) => state.set('trip', Immutable.fromJS(trip)),
  LOCATION_SET_MM: (state, { mm }) => state.set('mm', mm)
};

export default createReducer(initialState, reducers);
