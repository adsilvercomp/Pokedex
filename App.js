import React, {useState, useEffect, useRef} from 'react';
import Home from "./screens/Home";
import About from "./screens/About";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import DataContext from './DataContext';
import { PokemonRed, FontBold, cream} from "./styles/styleVariables.json";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App(){
  const [pokemonData, setPokemonData] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [next, setNext] = useState(null);
  const isInitialRender = useRef(true);


  // add to helperMethods
  const writeToCache = async(key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      addDataToState(value.data);
      
    } catch (err) {
      console.error('Error writing to cache:', err);
      throw err;
    }
  }

  // add to helper methods
  const getCachedData = async(key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (err) {
      console.error('Error reading data from cache:', err);
      throw err;
    }
  }


  const queryCachedData= async(url) => {
      await AsyncStorage.clear();

      if(!loading)setLoading(true);
  
      const cachedData = await getCachedData(url);
      
      if(cachedData !== null){
        addDataToState(cachedData.data);
        setNext(cachedData.next);
      }else{
        getPokemonGroupData(url);
      }

  }

    // code to fetch data
    const getPokemonGroupData = async (url) => {
      try{
        const response = await axios.get(url);
        const {data} = response;
        setNext(data.next);
        getIndividualPokemonData(data.results, url, data.next);
      }catch(err){
        console.error('Error fetching pokemon group data:', err.message);
        throwError();
        throw err; 
      }
    };
    
    // followup request to get info about each pokemon in initial request
    const getIndividualPokemonData = async (groupData, groupDataUrl, nextGroupUrl) => {
      const urlPromises = groupData.map(async (pokemon) => {
        try{
          response = await axios.get(pokemon?.url)
          return response
        }catch(err){
          console.error('Error fetching individual pokemon:', err.message);
          throwError();
          throw err; 
        }
    });
      try{
        // return an array of promises to execute together
        const results = await Promise.all(urlPromises);
        const processedData = results.filter(result => result !== null); 

        // processedData, groupDataUrl, nextGroupUrl
        createNewPokemonListItems(processedData, groupDataUrl, nextGroupUrl);
      }catch(err) {
        console.error('Error resolving individual pokemon promises:', err.message); // Log error details\
        throwError();
        throw err; 
      }
  };

  const throwError = () => {
    setError(true);
    setLoading(false);
  }

  // add to helper methods
  const cleanData = (data, newData) => {
    // remove duplicate values
    const filteredData = newData.filter((pokemon) =>  data.indexOf(pokemon) === -1)
    return filteredData;
  }

  const addDataToState = (newPokemonData) => {
    if (pokemonData) {
      const cleanNewPokemonData = cleanData(pokemonData, newPokemonData);
      setPokemonData([...pokemonData, ...cleanNewPokemonData]);
    } else {
      setPokemonData(newPokemonData);
    }
    setLoading(false);
  }
    

  const createNewPokemonListItems = async(processedData, url, next) => {
        // create an object for each of the pokemon that the flatList can consume
        const filteredPokemon = processedData.map((pokemon) => {
        return ({
          sprite: pokemon.data.sprites.front_default,
          name: pokemon.data.name,
          species: pokemon.data.species,
          id: pokemon.data.id,
        })
      });
  
      writeToCache(url, {data: filteredPokemon, next: next});
  }


    // import custom fonts at top level 
    const [fontsLoaded] = useFonts({
        'ZenMaruGothicBold': require('./assets/fonts/ZenMaruGothic-Bold.ttf'),
        'ZenMaruGothicMedium': require('./assets/fonts/ZenMaruGothic-Medium.ttf'),
    });

    useEffect(() => {
        async function prepare() {
            // prevents splash screen from automatically disappearing before fonts are loaded
            await SplashScreen.preventAutoHideAsync();
        }
        prepare()

          if (isInitialRender.current) {
            isInitialRender.current = false;
            queryCachedData('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10')
          }
             
    },[])

    // dismisses splash screen when fonts are loaded
    if(!fontsLoaded) {
        return undefined;
    } else{
        SplashScreen.hideAsync();
    }

    // Initialize stack navigator
    const Stack = createNativeStackNavigator();

    return(
      <DataContext.Provider value={{pokemonData: pokemonData, 
        queryCachedData: queryCachedData, 
        setLoading: setLoading, 
        loading: loading, 
        error: error, 
        next: next
      }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen 
              name="Home" 
              component={Home} 
              options={{
                title: "Pokédex",
                headerStyle: {
                  backgroundColor: PokemonRed,
                },
                headerTintColor: cream,
                headerTitleStyle: {
                  fontFamily: FontBold,
                  fontSize: 30,
                },
              }} 
            />
            <Stack.Screen 
              name="About" 
              component={About} 
              options={{
                title: "About",
                headerStyle: {
                  backgroundColor: PokemonRed,
                },
                headerTintColor: cream,
                headerTitleStyle: {
                  fontFamily: FontBold,
                  fontSize: 30,
                },
              }} 
            />
          </Stack.Navigator>
        </NavigationContainer>
      </DataContext.Provider>
    )
}









