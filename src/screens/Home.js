import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Navigation from '../utils/Navigation';
import MapView from 'react-native-maps';

class Home extends React.Component {
  render() {
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
          />
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
