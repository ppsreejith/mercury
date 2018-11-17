import React from 'react';
import _ from 'lodash';
import { TouchableNativeFeedback, StyleSheet, Text, View, Button, Image } from 'react-native';
import { connect } from 'react-redux';
import Navigation from '../../utils/Navigation';
import MapView, { Marker } from 'react-native-maps';
import BusMarker from '../../components/BusMarker';
import busImage from '../../../assets/bus.png';
import { busFilter, getCenter } from '../../utils';
import { setLocation } from '../../actions/locations';

class Home extends React.Component {
  static navigationOptions = {
    header: null
  };

  shouldComponentUpdate(nprops) {
    const nselected = nprops.locations.get('selected');
    const selected = this.props.locations.get('selected');
    const nbuses = nprops.buses;
    const buses = this.props.buses;
    return nselected != selected || nbuses != buses;
  }

  render() {
    const selected = this.props.locations.get('selected');
    const { zoom, origin, destination, center, delta } = getCenter(selected.toJS());
    console.log('zoom is', zoom);
    //#HACK
    if (this._center && this._center != center) {
      this.map.animateToRegion(
        _.extend(
          {},
          center,
          delta
        )
      );
    }
    this._center = center;
    // end #HACK
    const buses = this.props.buses.toJS();
    const BusMarkers = _.chain(buses).filter(busFilter).map(({ coordinates, rotation, id, seats }) => (
      <BusMarker key={id} zoom={zoom} seats={seats} coordinates={coordinates} rotation={rotation}/>
    )).value();
    const onRegionChange = _.debounce(region => this.props.dispatch(setLocation(region)), 300);
    const BusMap = (
      <MapView
          ref={ref => { this.map = ref; }}
          style={styles.map}
          onRegionChange={onRegionChange}
          initialRegion={_.extend({}, origin, delta)}>
        {BusMarkers}
        <Marker coordinate={origin} anchor={{ x: 0.5, y: 0.5 }} >
          <View style={{height: 10, width: 10, borderRadius: 10, backgroundColor: '#66ccff', borderColor: 'black', borderWidth: 1}}/>
        </Marker>
        {
          _.isEmpty(destination) ? null : (
           <Marker coordinate={destination} anchor={{ x: 0.5, y: 0.5 }}/>
          )
        }
      </MapView>
    );
    /* const BusMap = (<View />);*/
    return (
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          {BusMap}
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

export default connect(({ buses, locations }) => ({ buses, locations }))(Home);
