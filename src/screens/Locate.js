import React from 'react';
import { connect } from 'react-redux';
import { FlatList, StyleSheet, Text, View, Image } from 'react-native';
import { getTheme } from 'react-native-material-kit';
import Interactable from 'react-native-interactable';

const theme = getTheme();

const uri = 'https://78.media.tumblr.com/839109db9a08ef9b0c0492c8533a84f4/tumblr_pbey601BM21v2useeo1_1280.jpg';

class Locate extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
            data={[{key: 'a'}, {key: 'b'}]}
            renderItem={({item}) => <Text>{item.key}</Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Locate;
