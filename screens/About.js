import { View, StyleSheet } from 'react-native';
import PokemonAbout from '../components/PokemonAbout';
import Loader from '../components/Loader';
import useGet from '../customHooks/useGet';
import ErrorMessage from '../components/Error';

export default function About({ route }) {
  const { item } = route.params;

  const { data: info, isPending, error } = useGet(item.species.url);

  // Conditionally render based on loading and error states
  return (
    <View style={styles.container}>
      {isPending ? (
        <Loader />
      ) : error ? (
        <ErrorMessage />
      ) : (
        <PokemonAbout info={info} item={item} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    display: 'flex',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
