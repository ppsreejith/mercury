import Immutable from 'immutable';
import { createReducer } from '../utils';

const initialState = Immutable.fromJS({
  predictions: [],
  selected: {
    /* coordinates: {lat: 12.9609857, lng: 77.6387316},
     * description: "Domlur, Bengaluru, Karnataka, India"*/
  }
});

const reducers = {
  LOCATIONS_RECEIVED: (state, { predictions }) => state.set('predictions', Immutable.fromJS(predictions)),
  LOCATION_SELECTED: (state, selected) => state.set('selected', Immutable.fromJS(_.extend({ comfort: state.getIn(['selected', 'comfort'], 1) }, selected)))
};

export default createReducer(initialState, reducers);
