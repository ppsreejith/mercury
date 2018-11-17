import axios from 'axios';
import _ from 'lodash';
import queryString from 'query-string';

export const SERVER = 'http://json.io';

const decideRequest = prom => new Promise((resolve, reject) => prom
  .then(res =>
    (_.get(res, 'status') === 200
   ? resolve(_.get(res, 'data'))
   : reject(_.get(res, 'data.message', res))))
  .catch(err =>
    reject(_.get(err, 'response.data.message', err))));

const addJsonParams = (url, data) => {
  if (_.isEmpty(data)) {
    return url;
  }
  return _.join(
    [
      url,
      queryString.stringify(data)
    ],
    _.indexOf(url, '?') === -1 ? '?' : '&'
  );
};

export const makeRequest = ({
  method, url, headers, baseURL, data
}) => {
  if (!method || method == 'GET') {
    data = data || {};
    url = addJsonParams(url, data);
  }
  return axios({
    method: method || 'GET',
    baseURL: baseURL || SERVER,
    url,
    data,
    headers: headers || {}
  });
};

export default (params) => decideRequest(makeRequest(params));
