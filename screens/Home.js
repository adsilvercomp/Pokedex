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
      <View style={styles.listContainer}>
        {loading && <Text>Loading...</Text>}

        {error && <Text>Error Loading Data</Text>}

        {pokemonData !== undefined && (
          <FlatList 
          style={styles.list}
          keyExtractor={(item => item.id)}
          data={pokemonData}
          renderItem={({item}) => (
              <TouchableOpacity style={styles.listItem}>
                <Image style={styles.image} source={{ uri: item.sprite }}/>
                <Text>{item.name}</Text>
              </TouchableOpacity>
          )}
          />
        )}
      </View>
    )
    
}

const styles = StyleSheet.create({
  listContainer: {
    flex:1,
    backgroundColor:'orange',
    justifyContent:'center',
    alignItems:'center',

  },

  list: {
    flex:1,
    width: '100%',
    height: '100%',
    backgroundColor:'green',

  },

  listItem: {
    padding:10,
    height:100,
    display:'flex',
    flexDirection:'row',
    justifyContent:'flex-start',
    backgroundColor: 'gray',
    borderBottomColor: 'black',
    borderBottomWidth: 2
  },

  image:{
    height: 'auto',
    width: 70,
   
  }
})