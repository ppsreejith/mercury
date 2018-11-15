import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import Navigation from '../../utils/Navigation';
import MapView, { Marker } from 'react-native-maps';
import BusMarker from '../../components/BusMarker';
import busImage from '../../../assets/bus.png';

class Home extends React.Component {
  render() {
    const coordinates1 = {
      latitude: 12.931998723107322,
      longitude: 77.63207674026489
    };
    const coordinates2 = {
      latitude: 12.937164286215944,
      longitude: 77.62694835662843
    };
    return (
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <MapView
              style={styles.map}
              initialRegion={{
                latitude: 12.931224199999999,
                longitude: 77.6288809,
                latitudeDelta: 0.01522,
                longitudeDelta: 0.00921,
              }}
          >
            <BusMarker coordinates={coordinates1}/>
            <BusMarker coordinates={coordinates2}/>
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

export default Home;
