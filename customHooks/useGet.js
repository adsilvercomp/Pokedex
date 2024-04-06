import { useEffect, useState } from "react";
import  axios  from 'axios';

const useGet = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        
        axios.get(url)
        .then(function (response) {
            setData(response.data);
        })
        .catch(function (error) {
            setError(error.data)
        })
        .finally(function() {
            setIsPending(false);
        })

     },[url])

    //  data being returned from the custom hook
     return { data, isPending, error }
}

export default useGet;