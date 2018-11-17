import maps from '@google/maps';

const client = require('@google/maps').createClient({
  key: 'AIzaSyBeB5MINnWsyCMZbJvArgOx4Rr5wSdXNCI'
});

const findPlaces = ({ query }) => client.places({ query }).asPromise();

export default {
  findPlaces
};
