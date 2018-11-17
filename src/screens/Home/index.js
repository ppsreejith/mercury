import React from 'react';
import _ from 'lodash';
import { TouchableNativeFeedback, StyleSheet, Text, View, Button, Image } from 'react-native';
import { connect } from 'react-redux';
import Navigation from '../../utils/Navigation';
import MapView, { Marker } from 'react-native-maps';
import BusMarker from '../../components/BusMarker';
import busImage from '../../../assets/bus.png';
import { busFilter } from '../../utils';
import { setLocation } from '../../actions/locations';

class Home extends React.Component {
  static navigationOptions = {
    header: null
  };
  
  render() {
    const center = {
      latitude: 12.93286389862078,
      longitude: 77.6279523409903
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
    /* const BusMap = (
     *   <MapView
     *       style={styles.map}
     *       onRegionChange={_.debounce(region => this.props.dispatch(setLocation(region)), 300)}
     *       initialRegion={_.extend({}, center, delta)}>
     *     {BusMarkers}
     *   </MapView>
     * );*/
    const BusMap = (<View />);
    return (
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          {BusMap}
          <View style={{height: 10, width: 10, borderRadius: 10, backgroundColor: '#66ccff', borderColor: 'black', borderWidth: 1, position: 'absolute', top: '50%', left: '50%'}}/>
          <View style={styles.userInput}>
            <TouchableNativeFeedback onPress={() => Navigation.navigate('Locate')}>
              <View style={styles.whereTo}>
                <Text style={styles.navText}>Where to?</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  whereTo: {
    backgroundColor: 'white',
    width: '95%',
    padding: 10,
    paddingLeft: 20,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4
  },
  userInput: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'absolute',
    top: 10,
    padding: 10
  },
  spaceHolder: {
    height: 280
  },
  navText: {
    fontSize: 20
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    justifyContent: 'flex-end',
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default connect(({ buses }) => ({ buses }))(Home);
