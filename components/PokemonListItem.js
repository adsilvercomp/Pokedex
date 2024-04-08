import React, { memo } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import {
  lightBlue,
  PokemonRed,
  PokemonDarkBlue,
  FontBold,
  white,
  cream,
  line,
} from '../styles/styleVariables.json';

const PokemonListItem = memo(({ navigation, item }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('About', { item: item })}
      style={styles.listItem}
    >
      <Image style={styles.image} source={{ uri: item.sprite }} />
      <Text style={styles.name}>{item.name}</Text>
      <View style={styles.ellipsesContainer}>
        <FontAwesome5 name="ellipsis-h" size={25} color={PokemonRed} />
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    height: 110,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: cream,
    borderBottomColor: line,
    borderBottomWidth: 1,
  },

  image: {
    height: 'auto',
    width: 90,
    borderRadius: 20,
    backgroundColor: lightBlue,
    borderWidth: 3.5,
    borderColor: white,
  },

  name: {
    alignSelf: 'center',
    marginLeft: 20,
    color: PokemonDarkBlue,
    fontFamily: FontBold,
    fontSize: 18,
    textTransform: 'capitalize',
  },

  ellipsesContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    justifyContent: 'center',
    flex: 1,
    marginRight: 5,
  },
});

export default PokemonListItem;
