import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { TextInput, FlatList, StyleSheet, Text, View, Image } from 'react-native';
import { getTheme } from 'react-native-material-kit';
import Interactable from 'react-native-interactable';
import { loadPlaces } from '../actions/locations';

const theme = getTheme();

const uri = 'https://78.media.tumblr.com/839109db9a08ef9b0c0492c8533a84f4/tumblr_pbey601BM21v2useeo1_1280.jpg';

const ListItem = ({ item }) => (
  <View style={[styles.itemPadding, styles.ListValue]}>
    <Text style={{fontSize: 16}}>
      {item.description}
    </Text>
  </View>
)

class Locate extends React.Component {
  static navigationOptions = {
    title: 'Select Location'
  };
  
  render() {
    const predictions = this.props.locations.get('predictions');
    console.log('predictions are', predictions.toJS());
    return (
      <View style={styles.container}>
        <TextInput
            onChangeText={_.debounce(input => this.props.dispatch(loadPlaces({ input })), 300)}
            style={[styles.whereToBox, styles.itemPadding]}
            placeholder="Where to?"
            underlineColorAndroid="transparent"
        />
        <FlatList
            data={predictions.toJS()}
            renderItem={({item}) => <ListItem item={item}/>}
        />
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
  ListValue: {
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    backgroundColor: 'white',
  },
  itemPadding: {
    padding: 15,
    paddingLeft: 20,
  },
  container: {
  }
});

export default connect(({ locations }) => ({ locations }))(Locate);