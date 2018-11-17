import _ from 'lodash';
import makeRequest from '../utils/Network';

const request = params => makeRequest(
  _.extend({}, params, {
    baseURL: "https://maps.googleapis.com/maps/api",
    method: "GET",
    data: _.extend({}, _.get(params, 'data'), {
      key: "AIzaSyBeB5MINnWsyCMZbJvArgOx4Rr5wSdXNCI"
    })
  })
);

export const findPlaces = ({ input }) => request({
  url: 'place/autocomplete/json',
  data: { input }
});
