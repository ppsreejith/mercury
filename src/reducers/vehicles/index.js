import Immutable from 'immutable';
import _ from 'lodash';
import { createReducer } from '../../utils';
import busData from '../../utils/bus-data';

const transformedData = _.reduce(
  busData,
  (acc, value) =>
    _.set(
      acc,
      _.get(value, 'id'),
      _.extend({}, value, {
        coordinates: _.first(_.get(value, 'coordinates')),
        rotation: _.first(_.get(value, 'rotation')),
        seats: _.first(_.get(value, 'seats')),
        type: 'bus',
      })
    ),
  {}
);

const initialState = Immutable.fromJS(transformedData);

const reducers = {
  VEHICLE_LOCATION_UPDATED: (state, { id, coordinates, rotation }) => state.setIn(id, Immutable.fromJS({ id, coordinates, rotation }))
};

export default createReducer(initialState, reducers);
