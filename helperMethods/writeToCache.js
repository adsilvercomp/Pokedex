import AsyncStorage from '@react-native-async-storage/async-storage';

const writeToCache = async(key, value, addDataToState) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      addDataToState(value.data);
      
    } catch (err) {
      console.error('Error writing to cache:', err);
      throw err;
    }
  }

export default writeToCache;