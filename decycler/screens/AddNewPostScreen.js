import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Platform } from 'react-native';

import { KeyboardAvoidingView } from 'react-native';
import { TextInput } from 'react-native';

import { auth } from "../firebase";
import { firestore } from '../firebase';

import MapView from "react-native-maps";
import {Marker} from "react-native-maps";
import * as Location from "expo-location";
import * as Animatable from 'react-native-animatable';


const AddNewPostScreen = ({navigation}) => {

    const [userData, setData] = useState(null);

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [weight, setWeight] = useState('');
    const [material, setMaterial] = useState('');

    const [mapRegion, setRegion] = useState({
      latitude: 46.7712,
      longitude: 23.6236,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });

    const [tempCoords, setCoords] = useState(null);

    const userLocation = async () => {
      let {status} = await Location.requestForegroundPermissionsAsync()
      if(status !== "granted"){
        alert("Location permission denied");
        return;
      }
      
      let location = await Location.getCurrentPositionAsync();
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: location.coords.latitudeDelta,
        longitudeDelta: location.coords.longitudeDelta,
      });
    }

    useEffect(() => {
      userLocation();
    }, []);

    const handlePost = async () => {
      await firestore.collection("posts")
      .add({
        user: auth.currentUser.uid,
        title: title,
        description: desc,
        material: material,
        weight: weight,
        longitude: mapRegion.longitude,
        latitude: mapRegion.latitude,
        imgurl: 'https://www.timesnewroman.ro/wp-content/uploads/2020/11/seringi_pe_jos-copy.jpg',
        uniqueid: firestore.collection("posts").doc(),
      })
        .catch(error => {
           alert(error.message);
        })
      navigation.navigate("UserPage");
    }

    return (
        <KeyboardAvoidingView 
            style={styles.container}
           behavior="padding"
        >


          <View style={styles.mapContainer}>
             
             <MapView 
              style={styles.map}
              region={mapRegion}
              >
                <Marker onDrag={(event) => {setCoords(event.nativeEvent.coordinate)}} 
                onDragEnd={() => {setRegion(tempCoords)}}
                coordinate={mapRegion} title="Your location" draggable={true}/>
            </MapView>
           </View>
  

          

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate("AddInfo", {long: mapRegion.longitude, lat: mapRegion.latitude})}} >
              <Text style={styles.buttonText}>Okay</Text>
            </TouchableOpacity>
          </View>

        </KeyboardAvoidingView>
  );
}

export default AddNewPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
  },

 topContainer:{
    width: "100%",
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
 },

mapContainer: {
  width: "100%",
  marginTop: 0,
  alignItems: "center"
},

map: {
  width: "100%",
  height: "100%",
  borderColor: 'black'
},

 middleContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 0,
 },

 buttonContainer: {
    position: 'absolute',
    width: "100%",
    alignItems: "center",
    marginTop:"180%",
 },

 button:{
  backgroundColor: "#086b2e",
  width: "50%",
  height: 70,
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 10,
  elevation: 10,
  marginTop: 20,
},

buttonText:{
  color: "white",
  fontWeight: "700",
  fontSize: 16,
},

 title: {
    backgroundColor: "white",
    borderColor: "#086b2e",
    paddingHorizontal: 15,
    borderWidth: 2,
    borderRadius: 10,
    width: "70%",
    marginTop: 10,
    height: 40,
},

desc: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: "#086b2e",
    borderRadius: 10,
    width: "90%",
    height: 100,
    marginTop: 10,
},

rowContainer:{
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-evenly"
},

wmInput: {
  borderColor: "#086b2e",
  backgroundColor: "white",
  paddingHorizontal: 15,
  paddingVertical: 10,
  borderWidth: 2,
  borderRadius: 10,
  width: "40%",
  height: 40,
  marginTop: 10,
},

 t1: {
    color: "white",
    marginTop: 25,
    fontSize: 30,
    fontWeight: "600",
    textShadowColor: 'black', 
    textShadowOffset: { width: -1, height: 0 },
    textShadowRadius: 30,
 },

 t2: {
    color: "black",
    marginBottom: 5,
    fontSize: 15,
    fontWeight: "900",
 }

});
