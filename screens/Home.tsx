import React, { useState, useEffect } from 'react';
import { Text, View, FlatList } from 'react-native';


export default function Home(){
    const [pokemonData, setPokemonData] = useState<any>(null)

    interface listData {
        name: string
        url: string
    }

    const getData = async (url: string) => {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error('Failed to fetch initial data');
        }
        const data = await response.json();
        return data.results
    }

    const processUrls = async (data) => {
        const urlPromises = data.map(async (pokemon) => {
          const response = await fetch(pokemon.url);
          if (!response.ok) {
            throw new Error(`Failed to fetch data from ${pokemon.url}`);
          }
          return await response.json();
        });
      
        // Wait for all follow-up fetches to complete and return the results
        const results = await Promise.all(urlPromises);
        return results;
      }

      const main = async () => {
        try {
          const data = await getData('https://pokeapi.co/api/v2/pokemon/?limit=10');
  
          const processedData = await processUrls(data);

          const filteredPokemon = processedData.map(pokemon => ({
            sprite: pokemon.sprites.front_default,
            name: pokemon.name,
            stats: pokemon.stats,
            id: pokemon.id
          }));
        
          setPokemonData(filteredPokemon);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }


    useEffect(() => {
        main();
    },[])

  

    
    // for each pokemon, grab their url
    // make a second request
    // grab the id
    // grab sprite.official-artwork.front_default
    // grab their stats
    // grab their types
  



  
    return(
        <Text>Home</Text>
    )
}