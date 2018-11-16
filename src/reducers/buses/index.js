import Immutable from 'immutable';
import { createReducer } from '../../utils';

const initialState = Immutable.fromJS({
  1: {
    id: '1',
    coordinates: {
      latitude: 12.931998723107322,
      longitude: 77.63207674026489
    },
    rotation: 60,
    seats: 30
  },
  2: {
    id: '2',
    coordinates: {
      latitude: 12.937164286215944,
      longitude: 77.62694835662843
    },
    rotation: 60,
    seats: 20
  }
});

const reducers = {
  BUS_LOCATION_UPDATED: (state, { id, coordinates, rotation }) => state.setIn(id, Immutable.fromJS({ id, coordinates, rotation }))
};

export default createReducer(initialState, reducers);
