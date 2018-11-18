import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { TouchableNativeFeedback, TextInput, FlatList, StyleSheet, Text, View, Image } from 'react-native';
import Interactable from 'react-native-interactable';
import {
  getTheme
} from 'react-native-material-kit';
import cardInfo from '../utils/card-data.json';
import { changeComfort } from '../utils';
import Navigation from '../utils/Navigation';

const theme = getTheme();

class Comfort extends React.Component {
  static navigationOptions = {
    title: 'Customize Trip'
  };
  
  render() {
    const comfort = this.props.trip.get('comfort');
    const onSelect = (comfort) => () => {
      this.props.dispatch(changeComfort({comfort}));
      Navigation.back();
    };
    const Cards = _.map(cardInfo, ({ index, title, description, image }) => (
      <Interactable.View
          horizontalOnly
          snapPoints={[{ x: 0 }, { x: -200 }]}
          onSnap={onSelect(index)}
          key={index}
          dragEnabled={comfort !== index}
      >
        <View style={theme.cardStyle}>
          <Image source={{ uri: image }} style={theme.cardImageStyle} />
          <Text style={theme.cardContentStyle}>
            {title}
          </Text>
        </View>
      </Interactable.View>
    ));
    return (
      <View style={styles.container}>
        {Cards}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  whereToBox: {
    height: 60,
    fontSize: 16,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    elevation: 1,
    shadowOpacity: 0.8,
    shadowRadius: 4
  },
  itemPadding: {
    padding: 15,
    paddingLeft: 20,
  },
  container: {
  }
});

export default connect(({ trip }) => ({ trip }))(Comfort);
