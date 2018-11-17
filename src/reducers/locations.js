import Immutable from 'immutable';
import { createReducer } from '../utils';

const initialState = Immutable.fromJS({
  predictions: []
});

const reducers = {
  LOCATIONS_RECEIVED: (state, { predictions }) => state.setIn(['predictions'], Immutable.fromJS(predictions))
};

export default createReducer(initialState, reducers);
