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

export default function App(){
  const [pokemonData, setPokemonData] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [next, setNext] = useState(null);
  const isInitialRender = useRef(true);

  // code to fetch data
  const getInitialData = async (url) => {
    try{
      const response = await axios.get(url);
      return response;
    }catch(err){
      console.error('Error fetching initial pokemon list data:', err.message);
      throw err; 
    }
  };
  
  // followup request to get info about each pokemon in initial request
  const processUrls = async (data) => {
    const urlPromises = data.map(async (pokemon) => {
      try{
        response = await axios.get(pokemon?.url)
        return response
      }catch(err){
        console.error('Error fetching individual pokemon:', err.message);
        throw err; 
      }
    });
  
    // return an array of promises to execute together
    try{
      const results = await Promise.all(urlPromises);
      return results.filter(result => result !== null); ;
    }catch(err) {
      console.error('Error resolving individual promises:', err.message); // Log error details
      throw err; // Rethrow or return a special value to indicate failure
    }
    
  };
  
  const fetchData = async (url) => {
    if(!loading)setLoading(true);

    try {
      // get initial data
      const { data: initialData } = await getInitialData(url);

      // set url for next set of pokemon to grab
      setNext(initialData.next);

      // get additional data for each of the pokemon returned in returned in initialData
      const processedData = await processUrls(initialData.results);

      // create an object for each of the pokemon that the flatList can consume
      const filteredPokemon = processedData.map((pokemon) => {
        return ({
          sprite: pokemon.data.sprites.front_default,
          name: pokemon.data.name,
          species: pokemon.data.species,
          id: pokemon.data.id,
        })
      });

      if (pokemonData) {
        setPokemonData([...pokemonData, ...filteredPokemon]);
      } else {
        setPokemonData(filteredPokemon);
      }

    } catch (error) {
      console.error('Error fetching data:', error.message);
      
      setError(true);
    }

    setLoading(false);

  };
  
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
      <DataContext.Provider value={{pokemonData: pokemonData, 
        fetchData:fetchData, 
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









