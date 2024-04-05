import React, {useState, useEffect, useRef} from 'react';
import Home from "./screens/Home";
import About from "./screens/About";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import DataContext from './DataContext';


export default function App(){
  const [pokemonData, setPokemonData] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [next, setNext] = useState(null);
  const isInitialRender = useRef(true);

  // code to fetch data
  const getInitialData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch initial data');
    }
    const data = await response.json();
    return { data: data, response };
  };
  
  const processUrls = async (data) => {
    const urlPromises = data.map(async (pokemon) => {
      const response = await fetch(pokemon.url);
      if (!response.ok) {
        throw new Error(`Failed to fetch data from ${pokemon.url}`);
      }
      return { data: await response.json(), response };
    });
  
    // Wait for all follow-up fetches to complete and return the results
    const results = await Promise.all(urlPromises);
    return results;
  };
  
  const fetchData = async (url) => {
    setLoading(true);
    try {
      const { data: initialData, response: initialResponse } = await getInitialData(
        url
      );


      setNext(initialData.next);
      const processedData = await processUrls(initialData.results);
  
      const filteredPokemon = processedData.map((pokemon) => ({
        sprite: pokemon.data.sprites.front_default,
        name: pokemon.data.name,
        stats: pokemon.data.stats,
        id: pokemon.data.id,
      }));
      console.log('length!')
      console.log(filteredPokemon.length);
      console.log(filteredPokemon)
      if (pokemonData) {
        setPokemonData([...pokemonData, filteredPokemon]);
      } else {
        setPokemonData(filteredPokemon);
      }
    } catch (error) {
      console.log('status');
      console.log(error.response); // Accessing the status code from the response object
      console.error('Error fetching data:', error);
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
      <DataContext.Provider value={{pokemonData: pokemonData, fetchData:fetchData, loading: loading, error: error, next}}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen 
              name="Home" 
              component={Home} 
            />
            <Stack.Screen 
              name="About" 
              component={About} 
              options={{
                title: "details screen",
                headerStyle: {
                  backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }} 
            />
          </Stack.Navigator>
        </NavigationContainer>
      </DataContext.Provider>
    )
}









