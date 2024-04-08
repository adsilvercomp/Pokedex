import React, { useState, useEffect, useRef } from 'react';
import Home from './screens/Home';
import About from './screens/About';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import DataContext from './DataContext';
import { PokemonRed, FontBold, cream } from './styles/styleVariables.json';
import axios from 'axios';
import cleanData from './helperMethods/cleanData';
import getCachedData from './helperMethods/getCachedData';
import writeToCache from './helperMethods/writeToCache';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [next, setNext] = useState(null);
  const isInitialRender = useRef(true);

  // Check cache for data on load. If it doesn't exist get data from api
  const queryCachedData = async (url) => {
    // commented out code to clear phone cache for testing purposes:
    // await AsyncStorage.clear();

    if (!loading) setLoading(true);

    const cachedData = await getCachedData(url);

    if (cachedData !== null) {
      addDataToState(cachedData.data);
      setNext(cachedData.next);
    } else {
      getPokemonGroupData(url);
    }
  };

  // fetch group of pokemon from api
  const getPokemonGroupData = async (url) => {
    try {
      const response = await axios.get(url);
      const { data } = response;
      setNext(data.next);
      getIndividualPokemonData(data.results, url, data.next);
    } catch (err) {
      console.error('Error fetching pokemon group data:', err.message);
      throwError();
      throw err;
    }
  };

  // follow up request to get info about each pokemon in initial request
  const getIndividualPokemonData = async (
    groupData,
    groupDataUrl,
    nextGroupUrl,
  ) => {
    const urlPromises = groupData.map(async (pokemon) => {
      try {
        response = await axios.get(pokemon?.url);
        return response;
      } catch (err) {
        console.error('Error fetching individual pokemon:', err.message);
        throwError();
        throw err;
      }
    });
    try {
      // return an array of promises simultaneously
      const results = await Promise.all(urlPromises);
      const processedData = results.filter((result) => result !== null);

      createNewPokemonListItems(processedData, groupDataUrl, nextGroupUrl);
    } catch (err) {
      console.error(
        'Error resolving individual pokemon promises:',
        err.message,
      );
      throwError();
      throw err;
    }
  };

  // create an object for each of the pokemon that the flatList can consume
  const createNewPokemonListItems = async (processedData, url, next) => {
    const filteredPokemon = processedData.map((pokemon) => {
      return {
        sprite: pokemon.data.sprites.front_default,
        name: pokemon.data.name,
        species: pokemon.data.species,
        id: pokemon.data.id,
      };
    });

    // cache data to improve app performance, reduce server cost, and allow users to see data offline
    writeToCache(url, { data: filteredPokemon, next: next }, addDataToState);
  };

  // add or append pokemon data to state for flatList to consume
  const addDataToState = (newPokemonData) => {
    if (pokemonData) {
      // make sure there are no redundant pieces of data
      const cleanNewPokemonData = cleanData(pokemonData, newPokemonData);
      setPokemonData([...pokemonData, ...cleanNewPokemonData]);
    } else {
      setPokemonData(newPokemonData);
    }
    setLoading(false);
  };

  // handle errors
  const throwError = () => {
    setError(true);
    setLoading(false);
  };

  // import custom fonts at top level
  const [fontsLoaded] = useFonts({
    ZenMaruGothicBold: require('./assets/fonts/ZenMaruGothic-Bold.ttf'),
    ZenMaruGothicMedium: require('./assets/fonts/ZenMaruGothic-Medium.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      // prevents splash screen from automatically disappearing before fonts are loaded
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();

    if (isInitialRender.current) {
      isInitialRender.current = false;
      // get data on initial load
      queryCachedData('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10');
    }
  }, []);

  // dismisses splash screen when fonts are loaded
  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  // Initialize stack navigator
  const Stack = createNativeStackNavigator();

  return (
    <DataContext.Provider
      value={{
        pokemonData: pokemonData,
        queryCachedData: queryCachedData,
        setLoading: setLoading,
        loading: loading,
        error: error,
        next: next,
      }}
    >
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: 'Pokédex',
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
              title: 'About',
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
  );
}
