import React from 'react';
import _ from 'lodash';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { connect } from 'react-redux';
import Navigation from '../../utils/Navigation';
import MapView, { Marker } from 'react-native-maps';
import BusMarker from '../../components/BusMarker';
import busImage from '../../../assets/bus.png';
import { busFilter } from '../../utils';

class Home extends React.Component {
  render() {
    const center = {
      latitude: 12.931224199999999,
      longitude: 77.6288809
    };
    const delta = {
      latitudeDelta: 0.01522,
      longitudeDelta: 0.00921,
    }
    const buses = this.props.buses.toJS();
    console.log('buses are', _.filter(buses, busFilter));
    const BusMarkers = _.chain(buses).filter(busFilter).map(({ coordinates, rotation, id, seats }) => (
      <BusMarker key={id} seats={seats} coordinates={coordinates} rotation={rotation}/>
    )).value();
    return (
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <MapView
              style={styles.map}
              initialRegion={_.extend({}, center, delta)}>
            {BusMarkers}
          </MapView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default connect(({ buses }) => ({ buses }))(Home);
