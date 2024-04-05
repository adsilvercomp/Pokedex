import React, {memo} from 'react';
import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const PokemonListItem = memo (({item}) => {
    return(
        <TouchableOpacity style={styles.listItem}>
            <Image style={styles.image} source={{ uri: item.sprite }}/>
            <Text style={styles.name}>{item.name}</Text>
            <View style={styles.ellipsesContainer}>
                <AntDesign name="ellipsis1" size={24} color="black" />
            </View>   
        </TouchableOpacity>
    )
}) 

const styles = StyleSheet.create({
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

export default PokemonListItem;