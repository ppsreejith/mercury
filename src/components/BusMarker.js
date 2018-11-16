import React from 'react';
import { Image, ImageBackground, Text, View } from 'react-native';
import { Marker, Callout } from 'react-native-maps';
import busImage from '../../assets/bus.png';
import Tooltip from 'rn-tooltip';

export default ({ coordinates, rotation, seats }) => {
  return (
    <Marker
        coordinate={coordinates}
        anchor={{ x: 0.5, y: 0.5 }}
    >
      <ImageBackground style={{height: 30, width: 30, transform: [{ rotate: `${rotation + 30}deg`}]}} source={busImage}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', top: 0, transform: [{ rotate: '-30deg' }]}}>
          <Tooltip>
            <Text style={{color: 'yellow', fontSize: 14, fontWeight: '900'}}>{seats}</Text>
          </Tooltip>
        </View>
      </ImageBackground>
    </Marker>
  )
};
