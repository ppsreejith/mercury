import Immutable from 'immutable';
import { createReducer } from '../utils';

const initialState = Immutable.fromJS({
  comfort: 1,
  routes: [
    {
      vehicle: {
        id: '2',
        coordinates: {
          latitude: 12.937164286215944,
          longitude: 77.62694835662843
        },
        rotation: 60,
        seats: 22,
        type: 'bus'
      },
      eta: {
        time: new Date(),
      },
      ete: {
        time: new Date(),
      },
      pathColor: 'blue',
      paths: [
        {latitude: 12.9344562, longitude: 77.6296802},
        {latitude: 12.93687150412194, longitude: 77.6270341873169},
        {latitude: 12.938589178275233, longitude: 77.63271980708873}
      ]
    },
    {
      vehicle: {
        id: '1',
        coordinates: {
          latitude: 12.931998723107322,
          longitude: 77.63207674026489
        },
        rotation: 60,
        seats: 30,
        type: 'bus'
      },
      eta: {
        time: new Date(),
      },
      ete: {
        time: new Date(),
      },
      pathColor: 'green',
      paths: [
        {latitude: 12.94289253908437, longitude: 77.6382254996098},
        {latitude: 12.94720884448734, longitude: 77.6408004202641},
        {latitude: 12.949680358248205, longitude: 77.63927079815085}
      ]
    }
  ]
});

const reducers = {
  TRIP_RECEIVED: (state, { routes }) => state.set('routes', Immutable.fromJS(routes)),
  TRIP_SET_COMFORT: (state, { comfort }) => state.set('comfort', comfort)
};

export default createReducer(initialState, reducers);
