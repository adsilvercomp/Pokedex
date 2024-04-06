import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { PokemonLightBlue, PokemonDarkBlue, PokemonDarkYellow, Font, FontBold, lightBlue } from "../styles/styleVariables.json";

export default PokemonAbout = ({info, item}) => {   

    if(info){
        return(
            <>
                <View style={styles.header}>
                  <Image style={styles.image} source={{ uri: item.sprite }}/>
                <Text style={styles.name}>{item.name}</Text>
               </View>
               <View style={styles.infoContainer}>
                 <Text style={styles.sectionTitle}>Background:</Text> 
                   <Text style={styles.statFont}>Type: {info.egg_groups[1].name}</Text>
                   <Text style={styles.statFont}>Capture Rate: {info.capture_rate}</Text>
                   <Text style={styles.statFont}>Color: {info.color.name}</Text>
                   <Text style={styles.statFont}>Evolves From: {info.evolves_from_species ? info.evolves_from_species.name: 'N/A'}</Text>
                   <Text style={styles.statFont}>Base Happiness: {info.base_happiness}</Text>
               </View> 
            </>
          )
    }
    
}


const styles = StyleSheet.create({

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

      infoContainer:{
        flex:1,
        display: 'flex',
        alignItems:'center',

      },
      sectionTitle:{
        fontFamily: FontBold,
        color: PokemonDarkBlue, 
        fontSize:20,
        marginTop:16
      },

      statFont:{
        fontFamily: Font,
        color: PokemonDarkBlue, 
        marginTop:16,
        textTransform: 'capitalize'
      },

      scrollContainer: {
        flex:1,
        display: 'flex',
        justifyContent:'center',
      }

})


           