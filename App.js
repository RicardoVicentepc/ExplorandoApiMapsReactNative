import * as React from 'react';
import { useEffect, useState } from "react";
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Image, FlatList,RefreshControl,ScrollView} from 'react-native';
import { Button, TextInput} from 'react-native';

// import Geolocation from 'react-native-geolocation-service';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
export default function App() {
   const [origin, setOrigin] = useState(null);
   const [destination, setDestination] = useState(null);
   const casaDaJulia = 
   {
     latitude:-23.5617769,
     longitude:-46.3989296,
     latitudeDelta: 0.01,
     longitudeDelta: 0.01,
   } 
   
   
   
   function HomeScreen() {
      
   const [dados, setDados] = useState();
   const [turma, setTurma] = useState();
   const [serie, setSerie] = useState();
   const [componente, setComponente] = useState();
   const [aluno, setAluno ] = useState();
   const [comentario, setComentario] = useState();
 
     const verificar = () => {
       const valores = turma;
   
       fetch('http://192.168.1.7:80/ProjetoRelatorio/ProjetoRelatorio/relatorio-json-insert.php', {
         method: 'post',
         header: {
           'Accept': 'application/json',
           'Content-type': 'application/json'
         },
         body: JSON.stringify({
           turma: turma,
           serie: serie,
           componente: componente,
           aluno: aluno,
           comentario: comentario,
         })
       })
   
       setDados(valores)
     }
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
       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.forms}>
         <TextInput
           placeholder='Turma'
           placeholderTextColor={'#000'}
           style={styles.TextInput}
   
           onChangeText={text => setTurma(text)}
         />
          <TextInput
           placeholder='Série'
           placeholderTextColor={'#000'}
           style={styles.TextInput}
   
           onChangeText={text => setSerie(text)}
         />
          <TextInput
           placeholder='Componente Curricular'
           placeholderTextColor={'#000'}
           style={styles.TextInput}
   
           onChangeText={text => setComponente(text)}
         />
          <TextInput
           placeholder='Aluno'
           placeholderTextColor={'#000'}
           style={styles.TextInput}
   
           onChangeText={text => setAluno(text)}
         />
          <TextInput
           placeholder='Comentarios'
           placeholderTextColor={'#000'}
           color="#000"
           style={styles.Comentarios}
           maxLength={40}
   
           onChangeText={text => setComentario(text)}
         />
         <View>
           
         <Button
         title='salvar'
         onPress={() => verificar()}
         color="#F9B5B5"
         />
           
         </View>
         </View>
       </View>
     );
   }


function Mapa() {
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
 
 function SettingsScreen() {
   const wait = (timeout) => {
      return new Promise(resolve => setTimeout(resolve, timeout));
    }
   const [refreshing, setRefreshing] = React.useState(false);

   const onRefresh = React.useCallback(() => {
     setRefreshing(true);
     wait(2000).then(() => setRefreshing(false));
   }, []);
   const [isLoading, setLoading] = useState(true);
   const [data, setData] = useState([]);
 
   const getRelatorios = async () => {
      try {
       const response = await fetch('http://192.168.1.7:80/ProjetoRelatorio/ProjetoRelatorio/relatorio-json.php');
       const json = await response.json();
       setData(json.relatorios);
     } catch (error) {
       console.error(error);
     } finally {
       setLoading(false);
     }
   }
 
   useEffect(() => {
     getRelatorios();
   }, []);
   return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        >
        <View style={{ flex: 1, padding: 24 }}>
     {isLoading ? <ActivityIndicator/> : (
        <FlatList
         data={data}
         keyExtractor={({ idRelatorio }, index) => idRelatorio}
         renderItem={({ item }) => (
           <Text>id:{item.idRelatorio}  Aluno: {item.aluno}, Comentario:{item.comentario}</Text>
         )}
       >

       </FlatList>

)}
   </View>
   </RefreshControl>
     </View>
   );
 }
const Tab = createBottomTabNavigator();
  return (
   <NavigationContainer>
   <Tab.Navigator>
     <Tab.Screen name="Relatorio" component={HomeScreen} />
     <Tab.Screen name="Maps" component={Mapa} />
     <Tab.Screen name="Settings" component={SettingsScreen} />
   </Tab.Navigator>
 </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff9f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  TextInput: {
   height: 40,
   margin: 12,
   borderWidth: 1,
   padding: 10,
   fontFamily:'monospace',
   borderRadius: 48
   
 },
 StyleCadrasto: {
 },
 Comentarios: {
   height: 80,
   margin: 12,
   borderWidth: 1,
   padding: 5,
   borderRadius: 16

 }, 
 forms:
 {
   width:'80%',
   
 },
 h1: 
 {
   fontSize:25,
   padding:10,
   fontFamily:'monospace'
 
 },
});
