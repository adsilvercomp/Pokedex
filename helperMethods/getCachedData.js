import AsyncStorage from '@react-native-async-storage/async-storage';

const getCachedData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (err) {
    console.error('Error reading data from cache:', err);
    throw err;
  }
};

export default getCachedData;
