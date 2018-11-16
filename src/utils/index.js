import _ from 'lodash';

export const createReducer = (initialState, reducers) => (state = initialState, action = {}) => (action.type in reducers) ? reducers[action.type](state, action.payload) : state;

const in_range = (coord, c_coord, c_range) => (coord < (c_coord + c_range)) && (coord > (c_coord - c_range));

export const busFilter = ({ center, delta }) => (bus) => {
  const lat = _.get(bus, 'coordinates.latitude', 0);
  const long = _.get(bus, 'coordinates.longitude', 0);
  const c_lat = _.get(center, 'latitude', 90);
  const c_long = _.get(center, 'longitude', 90);
  const c_delta_lat = _.get(delta, 'latitudeDelta', 0);
  const c_delta_long = _.get(delta, 'longitudeDelta', 0);
  return in_range(lat, c_lat, c_delta_lat) && in_range(long, c_long, c_delta_long);
};
