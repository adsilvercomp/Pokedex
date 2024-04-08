import { useEffect, useState } from 'react';
import axios from 'axios';
import writeToCache from '../helperMethods/writeToCache';
import getCachedData from '../helperMethods/getCachedData';

const useGet = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const queryCache = async () => {
    const cachedData = await getCachedData(url);

    if (cachedData) {
      setData(cachedData);
      setIsPending(false);
    } else {
      try {
        const response = await axios.get(url);
        setData(response.data);
        writeToCache(url, response.data, setData);
      } catch (error) {
        setError(error.data);
      } finally {
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    // Only fetch data if data is not yet available
    if (!data) {
      queryCache();
    }
  }, [url, data]);
  // data being returned from the custom hook
  return { data, isPending, error };
};

export default useGet;
