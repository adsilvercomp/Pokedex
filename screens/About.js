import { Text, View, StyleSheet} from 'react-native';
import PokemonAbout from "../components/PokemonAbout";
import Loader from "../components/Loader";
import useGet from "../customHooks/useGet";

export default function About({route}){
 
  const { item } = route.params;

  const {data:info, isPending, error} = useGet(item.species.url);
    

    if(info){
      return(
        <View style={styles.container}>
           <PokemonAbout 
            info={info} 
            item={item}
          />
        </View>
      ) 
    }else if(error){
      return(
        <View style={styles.container}>
          <Text>There was an error loading the data</Text>
        </View>
      )
    }else if(isPending){
      return(
        <View style={styles.container}>
          <Loader/>
        </View>
      )
      
    }else{
      return ''
    }

}

const styles = StyleSheet.create({
    container: {
        flex:1,
        width: '100%',
        display:'flex',
      },

      errorMessage: {

      }

})

