import React, { useContext } from 'react';
import { Text, View, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { DataContext } from '../App';
import { AntDesign } from '@expo/vector-icons';



export default function Home(){
  
  const {pokemonData, loading, error} = useContext(DataContext)


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
                <Text style={styles.name}>{item.name}</Text>
                <View style={styles.ellipsesContainer}>
                  <AntDesign name="ellipsis1" size={24} color="black" />
                </View>   
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
    marginLeft: 10,
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