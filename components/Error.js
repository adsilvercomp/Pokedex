import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  FontBold,
  PokemonDarkBlue,
  cream,
} from '../styles/styleVariables.json';

export default ErrorMessage = () => {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorMessage}>
        There was an error fetching the data
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: cream,
  },
  errorMessage: {
    fontFamily: FontBold,
    color: PokemonDarkBlue,
    fontSize: 18,
  },
});
