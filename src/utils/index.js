import _ from 'lodash';

export const createReducer = (initialState, reducers) => (state = initialState, action = {}) => (action.type in reducers) ? reducers[action.type](state, action.payload) : state;

const in_range = (coord, c_coord, c_range) => (coord < (c_coord + c_range)) && (coord > (c_coord - c_range));

export const vehicleFilter = ({ center, delta }) => (vehicle) => {
  const lat = _.get(vehicle, 'coordinates.latitude', 0);
  const long = _.get(vehicle, 'coordinates.longitude', 0);
  const c_lat = _.get(center, 'latitude', 90);
  const c_long = _.get(center, 'longitude', 90);
  const c_delta_lat = _.get(delta, 'latitudeDelta', 0);
  const c_delta_long = _.get(delta, 'longitudeDelta', 0);
  return in_range(lat, c_lat, c_delta_lat) && in_range(long, c_long, c_delta_long);
};

export const getVehicles = ({ selected, vehicleInfo }) => {
  const { center, delta, destination } = getCenter(selected);
  if (_.isEmpty(destination)) {
    return _.filter(vehicleInfo, vehicleFilter({ center, delta }));
  }
  return [];
}

export const getCenter = ({ coordinates, description }) => {
  const origin = {
    latitude: 12.93286389862078,
    longitude: 77.6279523409903
  };
  const destination = coordinates ? {
    latitude: _.get(coordinates, 'lat'),
    longitude: _.get(coordinates, 'lng')
  } : {};
  const center =
    coordinates ?
    {
      latitude: (origin.latitude + destination.latitude)/2,
      longitude: (origin.longitude + destination.longitude)/2
    } :
    origin;
  const originalDelta = {
    latitudeDelta: 0.01522,
    longitudeDelta: 0.00921,
  };
  const delta = coordinates ? {
    latitudeDelta: Math.abs(origin.latitude - destination.latitude) + 0.01522,
    longitudeDelta: Math.abs(origin.longitude - destination.longitude) + 0.004921
  } : originalDelta;
  const zoom = originalDelta.latitudeDelta / delta.latitudeDelta;
  return {
    center,
    delta,
    origin,
    destination,
    zoom
  }
}
