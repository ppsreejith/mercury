import _ from 'lodash';
import makeRequest from '../utils/Network';

const request = params => makeRequest(
  _.extend({}, params, {
    baseURL: "https://maps.googleapis.com/maps/api",
    method: "GET",
    data: _.extend({}, _.get(params, 'data'), {
      key: "<INSERT API TOKEN HERE>"
    })
  })
);

export const findPlaces = ({ input }) => request({
  url: 'place/autocomplete/json',
  data: { input }
});

export const getPlace = ({ place_id }) => request({
  url: 'place/details/json',
  data: { placeid: place_id, fields: 'geometry' }
});
