import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import { lightBlue } from "../styles/styleVariables.json";

const App = () => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size="large" color={lightBlue} />
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