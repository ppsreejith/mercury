import Immutable from 'immutable';
import { createReducer } from '../utils';

const initialState = Immutable.fromJS({
  predictions: [],
  selected: {}
});

const reducers = {
  LOCATIONS_RECEIVED: (state, { predictions }) => state.set('predictions', Immutable.fromJS(predictions)),
  LOCATION_SELECTED: (state, selected) => state.set('selected', Immutable.fromJS(selected))
};

export default createReducer(initialState, reducers);
