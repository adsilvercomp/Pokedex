const fetchData = async <t> (url:string) => {
    let response
    
    fetch(url)
        .then((res) => {
            if(!res.ok){
                // if this error is thrown, it will be handled in the catch block
                throw Error('could not fetch the data for that resource');
            }
            return res.json()
        })
        .then((data ) => {
            response = data
            return response;
        }).catch((err) => {
            response = err.message
    });
    
    return response;
}

export default fetchData;