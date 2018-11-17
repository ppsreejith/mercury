import React from 'react';
import { Image, ImageBackground, Text, View } from 'react-native';
import { Marker, Callout } from 'react-native-maps';
import busImage from '../../assets/bus.png';
import _ from 'lodash';
import Tooltip from 'rn-tooltip';

export default ({ coordinates, rotation, seats }) => {
  const textCoordinates = _.extend({}, coordinates, {
    latitude: _.get(coordinates, 'latitude', 0) + 0.0005 * Math.cos(rotation * Math.PI / 180),
    longitude: _.get(coordinates, 'longitude', 0) + 0.0001 + 0.0005 * Math.sin(rotation * Math.PI / 180)
  });
  return (
    <View>
      <Marker
          coordinate={textCoordinates}
          anchor={{ x: 0.5, y: 0.5 }}
          title={""+seats}
          pinColor="yellow"
      >
        <View style={{transform: [{ rotate: `${rotation}deg`}], backgroundColor: 'yellow', borderRadius: 10}}>
          <Text style={{color: 'black', fontSize: 14, fontWeight: '900'}}>{seats}</Text>
        </View>
      </Marker>
      <Marker coordinate={coordinates}
              anchor={{ x: 0.5, y: 0.5 }}>
        <Image style={{height: 40, width: 40, transform: [{ rotate: `${rotation + 30}deg`}]}} source={busImage} />
      </Marker>
    </View>
  )
};
