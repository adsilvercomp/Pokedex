import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';


export default function About({route}){
    const { item } = route.params;
 
    return(
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: item.sprite }}/>
            <Text style={styles.name}>{item.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        width: '100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
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
})