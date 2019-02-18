import React from 'react';
import { Image, ImageBackground, Text, View } from 'react-native';
import { Marker, Callout } from 'react-native-maps';
import busImage from '../../assets/bus.png';
import _ from 'lodash';
import Tooltip from 'rn-tooltip';

const icons = {
  bus: busImage
}

export default ({ coordinates, rotation, seats, zoom, type }) => {
  const icon = icons[type];
  return (
    <View>
      <Marker coordinate={coordinates}
              anchor={{ x: 0.5, y: 0.5 }}>
        <Image style={{height: 40*zoom, width: 40*zoom, transform: [{ rotate: `${rotation + 30}deg`}]}} source={icon} />
      </Marker>
    </View>
  )
};
