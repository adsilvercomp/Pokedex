import React, { useContext,  useState } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import Loader from '../components/Loader';
import DataContext from '../DataContext';
import PokemonListItem from '../components/PokemonListItem';

export default function Home(){
  const [contentOffset, setContentOffset] = useState(0);
  const [intentionalScroll, setIntentionalScroll] = useState(false);
  const {pokemonData, loading, error, fetchData, next, setLoading} = useContext(DataContext)
  

    const fetchMorePokemon = () => {
        disableScroll();
        offsetScroll();
        
        if(next)fetchData(next);
    } 

    const getItemLayout = (data, index) => (
      { length: 100, offset: 100 * index, index }
    );

    const offsetScroll = () => {
      // Calculate the offset based on new data length:
      // new list length * item height - the height of 10 new items
      const newOffset = (pokemonData.length + 10) * 100 - 1000;
      setContentOffset(newOffset);
    };

    const disableScroll = () => {
      // disable scroll while data is loading
      setLoading(true);
    }

    if(error){
      return(
        <View style={styles.listContainer} >
          <Text>There was an Error Fetching Data</Text>
        </View>
      )
    }else{
      return(
        <View style={styles.listContainer} >
          {loading && <Loader/>}
  
          {pokemonData && (
            <FlatList 
                style={styles.list}
                getItemLayout={getItemLayout}
                keyExtractor={((item) => {
                  return item.name
                } )}
                contentOffset={contentOffset}
                data={pokemonData}
                onScrollBeginDrag = {() => setIntentionalScroll(true)}
                onEndReached={() => {
                  if(intentionalScroll){
                    fetchMorePokemon()
                    setIntentionalScroll(false);
                  }
                }}
                scrollEnabled={!loading}
                renderItem={({item}) => <PokemonListItem item={item}/>}
            />
          ) }
        </View>
        
      )
    }
   
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

})

