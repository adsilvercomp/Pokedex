import React, {useState, useEffect, useRef} from 'react';
import Home from "./screens/Home";
import About from "./screens/About";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import DataContext from './DataContext';
import {lightBlue, PokemonRed, FontBold} from "./styles/styleVariables.json";
import axios from 'axios';

export default function App(){
  const [pokemonData, setPokemonData] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [next, setNext] = useState(null);
  const isInitialRender = useRef(true);

  // code to fetch data
  const getInitialData = async (url) => {
    const response = await axios.get(url);
    return response;
  };
  
  const processUrls = async (data) => {

    const urlPromises = data.map(async (pokemon) => {
      const response = await axios.get(pokemon.url)
      return response
    });
  
    // Wait for all follow-up fetches to complete and return the results
    const results = await Promise.all(urlPromises);
    return results;
  };
  
  const fetchData = async (url) => {
    if(!loading)setLoading(true);

    try {
      const { data: initialData } = await getInitialData(url);


      setNext(initialData.next);
      const processedData = await processUrls(initialData.results);

      const filteredPokemon = processedData.map((pokemon) => ({
        sprite: pokemon.data.sprites.front_default,
        name: pokemon.data.name,
        species: pokemon.data.species,
        id: pokemon.data.id,
      }));

      if (pokemonData) {
        setPokemonData([...pokemonData, ...filteredPokemon]);
      } else {
        setPokemonData(filteredPokemon);
      }

    } catch (error) {
      console.error('Error fetching data:', error);
      console.log(error)
      setError(true);
    }

    setLoading(false);

  };
  
    // import custom fonts at top level 
    const [fontsLoaded] = useFonts({
        'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
        'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf')
    });

    useEffect(() => {
        async function prepare() {
            // prevents splash screen from automatically disappearing before fonts are loaded
            await SplashScreen.preventAutoHideAsync();
        }
        prepare()

          if (isInitialRender.current) {
            isInitialRender.current = false;
            fetchData('https://pokeapi.co/api/v2/pokemon/?limit=10');
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
      <DataContext.Provider value={{pokemonData: pokemonData, fetchData:fetchData, setLoading, loading: loading, error: error, next: next}}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen 
              name="Home" 
              component={Home} 
              options={{
                title: "Pokédex",
                headerStyle: {
                  backgroundColor: lightBlue,
                },
                headerTintColor: PokemonRed,
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
                  backgroundColor: lightBlue,
                },
                headerTintColor: PokemonRed,
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









