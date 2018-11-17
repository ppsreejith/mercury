import _ from 'lodash';
import { findPlaces, getPlace } from '../utils/Maps';

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

export const selectPlace = (place) => (dispatch) => {
  const { description } = place;
  getPlace(place)
    .then(({result}) => {
      const coordinates = _.get(result, 'geometry.location');
      dispatch({
        type: 'LOCATION_SELECTED',
        payload: { coordinates, description }
      });
    })
    .catch(err => console.log('error is', err));
};
