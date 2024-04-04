import React, { useState, useEffect, useContext } from 'react';
import { Text, View, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { DataContext } from '../App';


export default function Home(){
  
  const {pokemonData, loading, error} = useContext(DataContext)

    useEffect(() => {
      console.log('testing123')
      console.log(pokemonData);
    },[])

    return(
      <View style={styles.container}>
        {loading && <Text>Loading...</Text>}

        {error && <Text>Error Loading Data</Text>}

        {pokemonData !== undefined && (
          <FlatList 
          keyExtractor={(item => item.id)}
          data={pokemonData}
          renderItem={({item}) => (
              <TouchableOpacity>
                <Image source={{ uri: item.sprite }}/>
                <Text>{item.name}</Text>
              </TouchableOpacity>
          )}
          />
        )}
      </View>
    )
    
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'orange',
    justifyContent:'center',
    alignItems:'center',
    paddingTop: 10
  }
})