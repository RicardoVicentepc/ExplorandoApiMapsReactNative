import * as React from 'react';
import { useEffect, useState } from "react";
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import CustomMarker from 'CustomMarker';
import Geolocation from 'react-native-geolocation-service';
import * as Location from 'expo-location';

export default function App() {
const casaDaJulia = 
{
  latitude:-23.5617769,
  longitude:-46.3989296,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
}  
const [camera, setCamera] = useState({
  center:{
     latitude: 0,
     longitude: 0
  },
  pitch: 0,
  heading: 0,
  altitude: 1000,
  zoom: 16,
});
useEffect(() => {
  const startTracking = async () => {
     let { status } = await requestForegroundPermissionsAsync();
     //Obtendo permissões de localização, é necesário que as permissões sejam concedidas para que possamos obter a localização do usuário         
     if (status !== 'granted') {
        alert('Permissões para acessar a localização foram negadas.');
        return;
     }
     try {
         /* A função abaixo realiza o monitoramento da posição atual do usuário de acordo com os parâmetros fornecidos
           e retorna uma callback sempre que obtém a localização, a partir da callback iremos obter um objeto contendo as coordenadas */
        await watchPositionAsync({
           accuracy: Accuracy.Highest,
           timeInterval: 5000,
           distanceInterval: 50,
        }, (loc) => {
           /*
              Setando o estado da câmera a partir do operador spread, pois desejamos manter as demais propriedades da câmera intactas,
              senão o utilizarmos o spread precisaremos definir as demais propriedas novamente, 
              fugindo do nosso objetivo de criar uma câmera dinâmica
           */
           setCamera( prevCamera => ({
              ...prevCamera,
              center: {
                 latitude: loc.coords.latitude,
                 longitude: loc.coords.longitude,
              }
           }));
        }
        );
     } catch (err) {
        console.warn('Algo deu errado...');
     }
  }
  startTracking();
}, []);

  return (
    <View style={styles.container}>
   <MapView
         style={styles.map}
         camera={camera}
         showsUserLocation={true}
         showsMyLocationButton={false}
         zoomControlEnabled={true}
         loadingEnabled={true}
         loadingBackgroundColor={'#fff'}
         toolbarEnabled={false}
      >
         <Marker
            latitude={-23.5544}
            longitude={-46.6296}
            color={"#0F9D58"}
            id={'1'}
         >
         </Marker>
         <Marker
            latitude={-23.5583}
            longitude={-46.6282}
            id={'2'}
         >
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
