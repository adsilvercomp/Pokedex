// remove values from newData array, that would duplicate values in data array
const cleanData = (data, newData) => {
  const filteredData = newData.filter(
    (pokemon) => data.indexOf(pokemon) === -1,
  );
  return filteredData;
};

export default cleanData;
