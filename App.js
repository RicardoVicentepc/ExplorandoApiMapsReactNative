import * as React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';


export default function App() {
const casaDaJulia = 
{
  latitude:-23.5617769,
  longitude:-46.3989296,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
}  
const meuBarraco =
{
  latitude:-23.5272941,
  longitude:-46.4171535,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
}
  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
      <Marker coordinate={casaDaJulia}>
          <Image source={require('./assets/icon.png')} style={{width:80,height:10}}/>
           <View style={{backgroundColor: "purple"}}>
        </View>
      </Marker>
      <Marker coordinate={meuBarraco}>
          <View style={{backgroundColor: "red", padding: 10, borderRadius:100}}>
          <Text>id1</Text>
        </View>
      </Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
