import _ from 'lodash';
import { findPlaces } from '../utils/Maps';

export const setLocation = ({ latitude, longitude }) => (dispatch) => {
  console.log('latitude is', latitude);
  console.log('longitude is', longitude);
};

export const loadPlaces = ({ query }) => (dispatch) => {
  console.log('loading places');
  findPlaces({ query })
    .then(places => {
      console.log('places are', places);
    })
    .catch(err => console.log('get places error is', err));
};
