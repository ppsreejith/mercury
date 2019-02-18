import _ from 'lodash';
import {makeRequest} from './Network';
import Store from './Store';
import {nextPhase} from "./index";

const listenToServer = () => {
  const startTime = Date.now();
  const id = Store.getState().locations.get("id");
  const next = () => {
    setTimeout(listenToServer, Math.max(1000 - Date.now() + startTime, 0));
  };
  makeRequest({
    method: "GET",
    data: {
      id
    },
    url: "order"
  }).then(res => {
    const data = _.get(res, 'data.data');
    if (!_.isUndefined(data)) {
//      console.log('data is', data);
      Store.dispatch({
        type: "LOCATION_SET_TRIP",
        payload: data
      });
      const isOnTrip = !Store.getState().locations.get('phases').isEmpty();
      if ((isOnTrip && !data.driver) || (!isOnTrip && data.driver)) {
        Store.dispatch(nextPhase);
      }
    }
    next();
  }).catch(err => console.log("error is", err) || next());
};

setTimeout(listenToServer, 1000);
