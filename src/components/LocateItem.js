import React from 'react';
import { TouchableOpacity, TextInput, FlatList, StyleSheet, Text, View, Image } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import Navigation from '../utils/Navigation';
import { selectPlace } from '../actions/locations';

const ListItem = ({ item, dispatch }) => {
  const onSelect = _.flow([
    () => dispatch(selectPlace(item)),
    () => Navigation.back()
  ]);
  return (
    <View style={[styles.itemPadding, styles.ListValue]}>
      <TouchableOpacity onPress={onSelect}>
        <Text style={{fontSize: 16}}>
          {item.description}
        </Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  ListValue: {
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    backgroundColor: 'white',
  },
  itemPadding: {
    padding: 15,
    paddingLeft: 20,
  }
});


export default connect()(ListItem);
