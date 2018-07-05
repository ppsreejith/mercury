import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';

class About extends React.Component {
  render() {
    const name = this.props.test.get('name');
    return (
      <View style={styles.container}>
        <Text>About Page</Text>
        <Text>Name is { name }</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default connect(
  ({ test }) => ({ test })
)(About);
