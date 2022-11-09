import * as React from 'react';
import { useEffect, useState } from "react";
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Image} from 'react-native';
// import Geolocation from 'react-native-geolocation-service';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
export default function App() {
const casaDaJulia = 
{
  latitude:-23.5617769,
  longitude:-46.3989296,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
}  


const [origin, setOrigin] = useState(null);
const [destination, setDestination] = useState(null);


useEffect( ()=>{
   (async function(){
      const {status, permissions} = await Permissions.askAsync(Permissions.LOCATION);
      if( status == 'granted') 
         {
            let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
            setOrigin( {
               latitude:location.coords.latitude,
               longitude:location.coords.longitude,
               latitudeDelta:0.0922,
               longitudeDelta:0.0421
            })
         }
      else
         {
            throw new Error('Location permission not granted');
         }
   })();
}, []);


  return (
    <View style={styles.container}>
   <MapView
         style={styles.map}
         initialRegion=
         {origin}
         showsUserLocation={true}
         zoomEnabled={true}
         loadingEnabled={true}
      >


         <Marker coordinate={casaDaJulia}/>
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
