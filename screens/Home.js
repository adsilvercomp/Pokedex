import React, { useContext, useEffect } from 'react';
import { Text, View, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Loader from '../components/Loader';
import DataContext from '../DataContext';


export default function Home(){
  
  const {pokemonData, loading, error, fetchData, next} = useContext(DataContext)

    const fetchMorePokemon = () => {
        fetchData(next)
    } 


    return(
      <View style={styles.listContainer} >
        {loading && <Loader/>}

        {error && <Text>There was an Error Fetching Data</Text>}

        {pokemonData && (
          <FlatList 
              style={styles.list}
              keyExtractor={((item) => {
                return item.name
              } )}
              data={pokemonData}
              onEndReached={fetchMorePokemon}
              renderItem={({item}) => (
                  <TouchableOpacity style={styles.listItem}>
                    <Image style={styles.image} source={{ uri: item.sprite }}/>
                    <Text style={styles.name}>{item.name}</Text>
                    <View style={styles.ellipsesContainer}>
                      <AntDesign name="ellipsis1" size={24} color="black" />
                    </View>   
                  </TouchableOpacity>
              )}
          />
        ) }
      </View>
      
    )
}

const styles = StyleSheet.create({
  listContainer: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',

  },

  list: {
    flex:1,
    width: '100%',
    height: '100%',
  },

  listItem: {
    padding:10,
    height:100,
    display:'flex',
    flexDirection:'row',
    justifyContent:'flex-start',
    backgroundColor: '#FFF',
    borderBottomColor: '#CADCFC',
    borderBottomWidth: 1,
  },

  image:{
    height: 'auto',
    width: 70,
    borderRadius:20,
    backgroundColor:'#CADCFC'
  },

  name:{
    alignSelf:'center',
    marginLeft: 20,
    color:'#00246B',
    fontFamily: 'nunito-bold',
    fontSize: 18,
    textTransform:'capitalize'
  },

  ellipsesContainer:{
    display:'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flex:1
  }
})