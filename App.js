import React, {useState, useEffect} from 'react';
import Home from "./screens/Home";
import About from "./screens/About";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

export const DataContext = React.createContext();

export default function App(){
  const [pokemonData, setPokemonData] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  // code to fetch data
  const getInitialData = async (url) => {
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

  const fetchData = async () => {
    setLoading(true)
    try {
      const data = await getInitialData('https://pokeapi.co/api/v2/pokemon/?limit=10');

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
      setError(true);
    }
    setLoading(false);
  }
  


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

        fetchData();
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
      <DataContext.Provider value={{pokemonData: pokemonData, loading: loading, error: error}}>
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









