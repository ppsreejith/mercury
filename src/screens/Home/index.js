import React from 'react';
import _ from 'lodash';
import { TouchableNativeFeedback, StyleSheet, Text, View, Button, Image } from 'react-native';
import { connect } from 'react-redux';
import Navigation from '../../utils/Navigation';
import MapView, { Marker, Polyline } from 'react-native-maps';
import VehicleMarker from '../../components/VehicleMarker';
import { getCenter, getVehicles, getRoutes } from '../../utils';
import { setLocation } from '../../actions/locations';

class Home extends React.Component {
  static navigationOptions = {
    header: null
  };

  shouldComponentUpdate(nprops) {
    const nselected = nprops.locations.get('selected');
    const selected = this.props.locations.get('selected');
    const nvehicles = nprops.vehicles;
    const vehicles = this.props.vehicles;
    const trip = this.props.trip;
    const ntrip = nprops.trip;
    return (nselected !== selected) || (nvehicles !== vehicles) || (trip !== ntrip);
  }

  componentWillReceiveProps(nprops) {
    const selectedRef = this.props.locations.get('selected');
    const nselectedRef = nprops.locations.get('selected');
    if (selectedRef !== nselectedRef) {
      const selected = nselectedRef.toJS();
      const { center, delta } = getCenter(selected);
      this.map.animateToRegion(
        _.extend(
          {},
          center,
          delta
        ),
        500
      );
    }
  }

  render() {
    const selected = this.props.locations.get('selected').toJS();
    const { zoom, origin, destination, center, delta } = getCenter(selected);
    const vehicleInfo = this.props.vehicles.toJS();
    const routeInfo = this.props.trip.get('routes').toJS();
    const vehicles = getVehicles({ selected, vehicleInfo, routeInfo });
    const routes = getRoutes({ selected, routeInfo });
    const RouteMarkers = _.map(routes, ({ coordinates, strokeColor, strokeColors, strokeWidth}, index) => (
      <Polyline key={index} coordinates={coordinates} strokeColor={strokeColor} strokeColors={strokeColors} strokeWidth={strokeWidth}/>
    ));
    const VehicleMarkers = _.map(vehicles, ({ coordinates, rotation, id, seats, type }) => (
      <VehicleMarker key={id} zoom={zoom} seats={seats} coordinates={coordinates} rotation={rotation} type={type} />
    ));
    const PickComfortButton = _.isEmpty(destination) ? null : (
      <TouchableNativeFeedback onPress={() => Navigation.navigate('Comfort')}>
        <View style={{justifyContent: 'center', alignItems: 'center', padding: 10, backgroundColor:"white", bottom: 0, position: 'absolute', width: '100%'}}>
          <Text style={{ fontSize: 16 }}>Customize</Text>
        </View>
      </TouchableNativeFeedback>
    );
    const onRegionChange = _.debounce(region => this.props.dispatch(setLocation(region)), 300);
    const AppMap = (
      <MapView
          ref={ref => { this.map = ref; }}
          style={styles.map}
          initialRegion={_.extend({}, center, delta)}>
        {RouteMarkers}
        {VehicleMarkers}
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
    /* const AppMap = (<View />);*/
    return (
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          {AppMap}
          <View style={styles.userInput}>
            <TouchableNativeFeedback onPress={() => Navigation.navigate('Locate')}>
              <View style={styles.whereTo}>
                <Text style={styles.navText}>Where to?</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
        {PickComfortButton}
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
    width: '100%',
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
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

export default connect(({ vehicles, locations, trip }) => ({ vehicles, locations, trip }))(Home);
