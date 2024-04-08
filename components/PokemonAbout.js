import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import {
  PokemonDarkBlue,
  Font,
  FontBold,
  lightBlue,
  cream,
  line,
  white,
} from '../styles/styleVariables.json';

export default PokemonAbout = ({ info, item }) => {
  if (info) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.image} source={{ uri: item.sprite }} />
          <Text style={styles.name}>{item.name}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.sectionTitle}>Background:</Text>
          <Text style={styles.statFont}>
            Type: {info.egg_groups[0] ? info.egg_groups[0].name : 'unKnown'}
          </Text>
          <Text style={styles.statFont}>Capture Rate: {info.capture_rate}</Text>
          <Text style={styles.statFont}>Color: {info.color.name}</Text>
          <Text style={styles.statFont}>
            Evolves From:{' '}
            {info.evolves_from_species ? info.evolves_from_species.name : 'N/A'}
          </Text>
          <Text style={styles.statFont}>
            Base Happiness: {info.base_happiness}
          </Text>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    width: '100%',
  },
  header: {
    height: 250,
    display: 'flex',
    borderBottomColor: line,
    borderBottomWidth: 1,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: cream,
  },

  image: {
    height: 150,
    width: 150,
    borderRadius: 20,
    backgroundColor: lightBlue,
    borderWidth: 3.5,
    borderColor: white,
  },

  name: {
    marginTop: 14,
    color: PokemonDarkBlue,
    fontFamily: FontBold,
    fontSize: 18,
    textTransform: 'capitalize',
  },

  infoContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: cream,
  },
  sectionTitle: {
    fontFamily: FontBold,
    color: PokemonDarkBlue,
    fontSize: 20,
    marginTop: 16,
  },

  statFont: {
    fontFamily: Font,
    color: PokemonDarkBlue,
    marginTop: 16,
    textTransform: 'capitalize',
  },
});
