import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { PokemonLightBlue, PokemonDarkBlue, PokemonDarkYellow, FontBold, lightBlue } from "../styles/styleVariables.json";

export default function About({route}){
    const { item } = route.params;
 
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.image} source={{ uri: item.sprite }}/>
                <Text style={styles.name}>{item.name}</Text>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        width: '100%',
        display:'flex',
      },

      header:{
        height: 150,
        display: 'flex',
        borderBottomColor: lightBlue,
        borderBottomWidth:1,
        alignItems: 'center',
        textAlign:'center',
        justifyContent: 'center'
      },

    image:{
        height: 70,
        width: 70,
        borderRadius:20,
        backgroundColor: lightBlue,
      },
    
      name:{
        marginTop:10,
        color: PokemonDarkBlue,
        fontFamily: FontBold,
        fontSize: 18,
        textTransform:'capitalize'
      },
})