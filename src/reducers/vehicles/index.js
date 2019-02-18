import Immutable from 'immutable';
import _ from 'lodash';
import { createReducer } from '../../utils';
import vehicleData from '../../utils/vehicle-data';

const transformedData = _.reduce(
  vehicleData,
  (acc, value) =>
    _.set(
      acc,
      _.get(value, 'id'),
      _.extend({}, value, {
        coordinates: _.first(_.get(value, 'coordinates')),
        rotation: _.first(_.get(value, 'rotation')),
        seats: _.first(_.get(value, 'seats')),
      })
    ),
  {}
);

const initialState = Immutable.fromJS(transformedData);

const reducers = {
  VEHICLE_LOCATION_UPDATED: (state, { id, coordinates, rotation }) => state.setIn(id, Immutable.fromJS({ id, coordinates, rotation }))
};

export default createReducer(initialState, reducers);
