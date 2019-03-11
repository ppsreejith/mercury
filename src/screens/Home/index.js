import React from 'react';
import _ from 'lodash';
import { TouchableOpacity, TouchableNativeFeedback, StyleSheet, Text, View, Image, TextInput } from 'react-native';
import { connect } from 'react-redux';
import Navigation from '../../utils/Navigation';
import MapView, { Marker, Polyline } from 'react-native-maps';
import VehicleMarker from '../../components/VehicleMarker';

import cardInfo from '../../utils/card-data.json';
import { getCenter, getVehicles, getRoutes, nextPhase } from '../../utils';
import { setLocation } from '../../actions/locations';
import { changeComfort } from '../../utils';
import Interactable from 'react-native-interactable';
import routeData from '../../utils/route-data.json';
import moment from 'moment';
import {Button} from '@ant-design/react-native'

import {
  getTheme
} from 'react-native-material-kit';

const theme = getTheme();
const imgDim = 40;
const VehicleIcons = {
  "bus": <Image source={require('../../../assets/bus_img.jpg')} style={{width: imgDim, height: imgDim, borderRadius: imgDim/2}} />,
  "auto": <Image source={require('../../../assets/auto_img.jpg')} style={{width: imgDim, height: imgDim, borderRadius: imgDim/2}} />,
  "metro": <Image source={require('../../../assets/metro_img.jpg')} style={{width: imgDim, height: imgDim, borderRadius: imgDim/2}} />
}

class Home extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
        currentPosition: 0,
        mm: 0
    }
  }

  shouldComponentUpdate(nprops) {
    const nselected = nprops.locations.get('selected');
    const selected = this.props.locations.get('selected');
    const ida = this.props.locations.getIn(['trip', 'driver'])
    const nida = nprops.locations.getIn(['trip', 'driver'])
    const isHaggling = this.props.locations.get('isHaggling');
    const isWaiting = this.props.locations.get('isWaiting');
    const nisHaggling = nprops.locations.get('isHaggling');
    const nisWaiting = nprops.locations.get('isWaiting');
    const nvehicles = nprops.vehicles;
    const vehicles = this.props.vehicles;
    const trip = this.props.trip;
    const ntrip = nprops.trip;
    return (nselected !== selected) || (nvehicles !== vehicles) || (trip !== ntrip || isHaggling != nisHaggling || isWaiting != nisWaiting || ida != nida);
  }

  componentWillReceiveProps(nprops) {
    const selectedRef = this.props.locations.get('selected');
    const nselectedRef = nprops.locations.get('selected');
    const originRef = this.props.locations.get('origin');
    const noriginRef = nprops.locations.get('origin');
    if (selectedRef !== nselectedRef || originRef != noriginRef) {
      const selected = nselectedRef.toJS();
      const origin = noriginRef.toJS();
      const { center, delta } = getCenter(selected, origin);
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
    const comfort = this.props.trip.get('comfort');
    const onSelect = (comfort) => () => {
      this.props.dispatch(changeComfort({comfort}));
      Navigation.back();
    };
    const onTextChanged = (text) => {
      this.setState({mm: text})
      this.props.dispatch({
        type: "LOCATION_SET_MM",
        payload: {mm: text}
      })
    }
    const HagglingBoard = (
      <View style={styles.HagglingBoard}>
        <Text style={{fontSize: 20, fontWeight: "600"}}>
          Meter Mele
        </Text>
      <View style={{flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
        <View style={{flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
        <Text style={{fontSize: 50, fontWeight: "600"}}>Rs. 30</Text>
        <Text>FARE</Text>
        </View>
        <View style={{flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
        <TextInput 
          style={{fontSize: 50, fontWeight: "600"}}
          keyboardType='numeric'
          onChangeText={(text)=> onTextChanged(text)}
          value={this.state.mm}
          maxLength={10}  //setting limit of input
        />
        <Text>+ MAXIMUM METER MELE</Text>
        </View>
      </View>
    </View>);


    const DriverBoard = ({fare}) => (
      <View style={styles2.container}>
        <View style={styles2.rowDivider}>
          <View style={[styles2.colDivider,{borderBottomColor:"#eee",borderBottomWidth: 1}]}>
            <View style={{flex:2, justifyContent: 'space-between', alignItems: 'center'}}>
              <Image source={require('../../../assets/raja.png')} style={{width: 100, height: 100, borderRadius: 100/2}} />
              <Text>Auto Raja</Text>
              <Text>KA05 6437</Text>
            </View>
            <View  style={{flex:3, justifyContent: 'space-between', padding: 10}}>
              <Text><Text  style={{fontWeight:"800"}}>To: </Text><Text>Indiranagar Metro Station</Text></Text>
            </View>
          </View>
          <View style={styles2.colDivider}>
            <View style={styles2.rowDivider}>
              <Text style={styles2.title}>₹{26 + fare}</Text>
              <Text style={styles2.backgroundText}>Total Fare</Text>
            </View>
            <View style={styles2.rowDivider}>
              <Text style={styles2.title}>₹{fare}</Text>
              <Text style={styles2.backgroundText}>Meter Mele</Text>
            </View>
          </View>
          <Button style={{backgroundColor: "#fff", color: "#333", width: "100%"}}>Call Driver</Button>    
        </View>        
      </View>);

    const WaitingBoard = () => (
      <View style={styles2.container}>
        <View style={styles2.rowDivider}>
          <View style={[styles2.colDivider,{borderBottomColor:"#eee",borderBottomWidth: 1}]}>
            <Text>
              Waiting..
            </Text>
          </View>
        </View>
      </View>);


    const Cards = _.map(cardInfo, ({ index, title, subtitle, description, image }) => {
      const selected = index == comfort? {
        borderColor: '#27ae60',
        borderWidth: 2
      }: {};
      const Vehicles = _.map(routeData[index], ({vehicle, duration, fare, occupancy}) => (
        <View style={[{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}]}>
          {VehicleIcons[vehicle.type]}
          <Text>{duration.time} mins | Rs. {fare}</Text>
          <Text style={{backgroundColor:occupancy.color, padding: 3, borderRadius: 5, color: "#eee"}}>{occupancy.value}</Text>
        </View>
      ));
      const totalTime = _.reduce(routeData[index], (acc, {duration}) => acc + duration.time, 0);
      const totalFare = _.reduce(routeData[index], (acc, {fare}) => acc + fare, 0);
      return (
        <TouchableOpacity onPress={onSelect(index)}>
          <View style={[theme.cardStyle, styles.cards, selected]}>
            <Text style={{padding: 10}}>
              <Text style={{fontWeight:"800"}}>{title}</Text><Text> : {subtitle}</Text>
            </Text>
            <View style={[{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingBottom: 5, marginBottom: 5, borderBottomColor:"#eee", borderBottomWidth: 1}]}>
              <Text style={{fontSize:15}}><Text>Total Duration : </Text><Text style={{fontWeight:"800"}}>{totalTime} Minutes</Text></Text>
              <Text style={{fontSize:15}}><Text>Estd. Fare : </Text> <Text  style={{fontWeight:"800"}}>Rs {totalFare}</Text></Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              {Vehicles}
            </View>
          </View>
        </TouchableOpacity>
      );
    });
    
    const timeWindow = {marginLeft: 5, backgroundColor: 'white', padding: 5, borderRadius: 5, borderWidth: 1, borderColor: 'black'}
    const timeText = {color: 'black', fontSize: 14};
    const selected = this.props.locations.get('selected').toJS();
    const isOnTrip = !this.props.locations.get('phases').isEmpty();
    const isDriverAssigned = !_.isUndefined(this.props.locations.getIn(['trip', 'driver']));
    const isWaiting = this.props.locations.get('isWaiting');
    const isHaggling = this.props.locations.get('isHaggling');
    const isNotPlanningTrip = _.isUndefined(this.props.locations.getIn(['selected', 'coordinates', 'lat']));
    const origin = this.props.locations.get('origin').toJS();
    const { zoom, destination, center, delta } = getCenter(selected, origin);
    const vehicleInfo = this.props.vehicles.toJS();
    const routeInfo = this.props.trip.get('routes').toJS();
    const vehicles = getVehicles({ selected, vehicleInfo, routeInfo, origin });
    const routes = getRoutes({ selected, routeInfo, origin });
    const RouteMarkers = _.map(routes, ({ eta, ete, coordinates, strokeColor, strokeColors, strokeWidth}, index) => (
      <View key={index}>
        <Polyline coordinates={coordinates} strokeColor={strokeColor} strokeColors={strokeColors} strokeWidth={strokeWidth}/>
        <Marker anchor={{x: 0, y: 0.5}} coordinate={_.first(coordinates)}>
          <View style={timeWindow}>
            <Text style={timeText}>{eta}</Text>
          </View>
        </Marker>
        <Marker anchor={{x: 0, y: 0.5}} coordinate={_.last(coordinates)}>
          <View style={timeWindow}>
            <Text style={timeText}>{ete}</Text>
          </View>
        </Marker>
      </View>
    ));
    const VehicleMarkers = _.map(vehicles, ({ coordinates, rotation, id, seats, type }) => (
      <VehicleMarker key={id} zoom={zoom} seats={seats} coordinates={coordinates} rotation={rotation} type={type} />
    ));
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
        <View style={{position: 'absolute', width: '100%', bottom: 0}}>
          <View style={{position: 'relative'}}>
            {isWaiting || isHaggling || isOnTrip || isNotPlanningTrip ? null : Cards}
            {!isOnTrip && isHaggling ? HagglingBoard : null}
            {!isOnTrip && isWaiting ? <WaitingBoard/> : null}
            {isDriverAssigned ? <DriverBoard fare={this.props.locations.getIn(['trip', 'fare'])}/> : null}
            <View>
              <TouchableNativeFeedback onPress={() => {this.props.dispatch(nextPhase)}}>
                <View style={{justifyContent: 'center', alignItems: 'center', padding: 10, backgroundColor:"white", width: '100%'}}>
                  <Text style={{ fontSize: 16 }}>Submit</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const styles2 = StyleSheet.create({
  container: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    margin: 20,
  },
  rowDivider: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  colDivider: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  title: {
    fontSize: 50,
    fontWeight: "800",
  },
  backgroundText: {
    color: "#aaa"
  },
  white: {
    color: "#333"
  }
});
const styles = StyleSheet.create({
  whereTo: {
    backgroundColor: 'white',
    width: '95%',
    padding: 10,
    paddingLeft: 20,
    borderWidth: 0,
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
  cards: {
    padding: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5
  },
  HagglingBoard:{
    flex:1,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    margin: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  DriverInfo:{
    flex:1,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    margin: 10,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default connect(({ vehicles, locations, trip }) => ({ vehicles, locations, trip }))(Home);
