import _ from 'lodash';
import routeData from './route-data.json';
import {makeRequest} from './Network';
import moment from 'moment';
import getDate from 'date.js';

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

export const getVehicles = ({ selected, vehicleInfo, routeInfo, origin }) => {
  const { center, delta, destination } = getCenter(selected, origin);
  const vehicles = _.isEmpty(destination) ? vehicleInfo : _.chain(routeInfo).map(({ vehicle }) => vehicle).filter(_.identity).value();
  return _.filter(vehicles, vehicleFilter({ center, delta }));
}

const findRoutesForComfort = ({ comfort }) => routeData[comfort];

export const changeComfort = ({ comfort }) => (dispatch) => {
  const routes = findRoutesForComfort({ comfort });
  dispatch({
    type: 'TRIP_SET_TRIP',
    payload: { comfort, routes }
  });
}

export const getRoutes = ({ selected, routeInfo, origin }) => {
  const { destination } = getCenter(selected, origin);
  if (_.isEmpty(destination)) {
    return [];
  }
  const paths = _.map(routeInfo, ({ paths }) => paths);
  const colours = _.map(routeInfo, ({ pathColor }) => pathColor);
  const etas = _.map(routeInfo, ({ eta }) => getDate(_.get(eta, 'time')));
  const etes = _.map(routeInfo, ({ ete }) => getDate(_.get(ete, 'time')));
  const params = _.chain(_.zip(paths, colours, etas, etes)).map((values) => ({
    coordinates: values[0],
    strokeColor: values[1],
    eta: moment(values[2]).format('hh:mm A'),
    ete: moment(values[3]).format('hh:mm A'),
    strokeColors: _.times(_.size(values[0]), () => values[1]),
    strokeWidth: 4
  })).filter(item => !_.isEmpty(item.coordinates)).value();
  return params;
}

export const getCenter = ({ coordinates }, origin) => {
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
    destination,
    zoom
  }
}

const createOrder = (id, mm) => {
  makeRequest({
    method: "POST",
    data: {
      "pickup": {
        "lat": 12.973528,
        "long": 77.64131189999999
      },
      "drop": {
        "lat": 12.973528,
        "long": 77.64131189999999
      },
      id,
      "user": {
    	"name": "Fernando"
      },
      "metermele": mm
    },
    url: "requests"
  }).then(res => {
    console.log("response is", res);
  }).catch(err => console.log("error is", err));
}

export const nextPhase = (dispatch, getState) => {
  const location = getState().locations;
  if (!location.get('phases').isEmpty()) {
    return dispatch({
      type: "LOCATION_UPDATE_PATH"
    });
  }
  if (!location.get('isHaggling')) {
    return dispatch({
      type: "LOCATION_SET_HAGGLING"
    });
  }
  if (!location.get('isWaiting')) {
    const id = location.get("id");
    const mm = location.get("mm");
    createOrder(id, mm);
    return dispatch({
      type: "LOCATION_SET_WAITING"
    });
  }
  const { routes } = getState().trip.toJS();
  const phases = _.chain(routes).map((route) => {
    const finalPath = _.last(route.paths);
    return {
      origin: _.first(route.paths),
      destination: {
        lat: finalPath.latitude,
        lng: finalPath.longitude
      }
    }
  }).value();
  const finalDestination = _.last(phases).destination;
  phases.push({
    origin: {
      latitude: finalDestination.lat,
      longitude: finalDestination.lng
    }
  });
  dispatch({
    type: "LOCATION_SET_PHASE",
    payload: {
      phases
    }
  });
  return dispatch({
    type: "LOCATION_UPDATE_PATH"
  });
}
