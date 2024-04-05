import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const App = () => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size="large" color="#CADCFC" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center', // Center the ActivityIndicator horizontally
    height:50
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 50,
  },
});

export default App;