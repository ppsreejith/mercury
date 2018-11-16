import Immutable from 'immutable';
import _ from 'lodash';
import { createReducer } from '../../utils';
import busData from '../../utils/bus-data';

const transformedData = _.reduce(
  busData,
  (acc, value) => _.set(acc, _.get(value, 'id'), value),
  {}
);

const initialState = Immutable.fromJS(transformedData);

const reducers = {
  BUS_LOCATION_UPDATED: (state, { id, coordinates, rotation }) => state.setIn(id, Immutable.fromJS({ id, coordinates, rotation }))
};

export default createReducer(initialState, reducers);
