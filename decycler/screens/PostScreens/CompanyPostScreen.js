import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MapView from 'react-native-maps'

import * as Animatable from 'react-native-animatable';
import { MapIcon ,GlobeEuropeAfricaIcon ,ScaleIcon,ClockIcon, UserIcon } from 'react-native-heroicons/outline'
import { Marker } from 'react-native-maps';
import { TextInput } from 'react-native';

import { auth } from "../../firebase"
import { firestore } from '../../firebase';

const CompanyPostScreen = ({route, navigation}) => {

  const [money, setMoney] = useState('');

  const mapRegion = {
    latitude: route.params.latitude,
    longitude: route.params.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  let seller = route.params.user;
  let postUniqueid = route.params.uniqueid;

  const [companyData, setData] = useState('');

  useEffect(() => {
    firestore.collection("users")
    .doc(auth.currentUser.uid).get()
    .then(snapshot => {
      if(snapshot.exists){
        setData(snapshot.data());
      }
    });
  }, []);

  let name = companyData.name;
  let pnum = companyData.phonenumber;

  const handleOffer = async () => {
    const doc = await firestore.collection("offers")
      .add({
        buyer: auth.currentUser.uid,
        seller: seller,
        postUniqueid: postUniqueid,
        money: money,
        companyName: name,
        phoneNumb: pnum,
      })
        .catch(error => {
           alert(error.message);
        })
        doc.update({uniqueid: doc.id});

        alert("Offer sent");
      navigation.navigate("CompanyPage"); 
  };

  return (
   <SafeAreaView>
    <View style={styles.mapContainer}>
      <MapView 
      style={styles.map}
      region={mapRegion}>
        <Marker coordinate={mapRegion} title="Seller location" draggable={false}/>
      </MapView>
    </View>


    
    <View className="mx-4 mt-4">

      <Animatable.Image                                                
      style={{
        borderRadius: 40,
      }}
      className="h-40 w-full" 
      source={{
    uri: route.params.imgurl
     }} />
       <View className='items-center'> 
     <Animatable.Text className="font-bold text-[25px] text-[#086b2e] "> {route.params.title}  </Animatable.Text></View>
     <View className='flex-row items-center ml-1'>
     <GlobeEuropeAfricaIcon color='#086b2e' opacity={0.5} size={22}/>
     <Animatable.Text className="font-bold text-gray-400 text-[15x]"> Material: {route.params.material}</Animatable.Text>
     </View>
     
     <Animatable.Text className="text-gray-400 text-[15px] bg-white pb-12 rounded-lg"> {route.params.description} </Animatable.Text>
    </View>

     <View  className='mt-12' style={styles.lowerContainer}>
        <TextInput className='mt-12'
            placeholder="Your offer"
            value={money}
            onChangeText={text => setMoney(text)}
            style={styles.input}
        />

        <TouchableOpacity className='mt-2' style={styles.button} onPress={handleOffer}>
            <Text style={styles.buttonText}>Offer price</Text>
        </TouchableOpacity>
     </View>

   </SafeAreaView>
  )
}

export default CompanyPostScreen

const styles = StyleSheet.create({
mapContainer: {
  width: "100%",
  marginTop: 5,
  alignItems: "center"
},

map: {
  width: "100%",
  height: 150,
},

lowerContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
},

input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    width: "40%",
    marginBottom: 10,
  },

button: {
    elevation: 10,
    backgroundColor: "#086b2e",
    width: "50%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
},

buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16
},

});