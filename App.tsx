import React from 'react';
import Home from "./screens/Home";
import About from "./screens/About";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

export default function App(){
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
 
    )
}









