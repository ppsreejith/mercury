import _ from 'lodash';
import { findPlaces } from '../utils/Maps';

export const setLocation = ({ latitude, longitude }) => (dispatch) => {
  console.log('latitude is', latitude);
  console.log('longitude is', longitude);
};

export const loadPlaces = ({ input }) => (dispatch) => {
  findPlaces({ input })
    .then(places => dispatch({
      type: "LOCATIONS_RECEIVED",
      payload: places
    }))
    .catch(err => console.log('get places error is', err));
};
