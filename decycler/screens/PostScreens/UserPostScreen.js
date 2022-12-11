import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MapView from 'react-native-maps'

import * as Animatable from 'react-native-animatable';
import { MapIcon ,GlobeEuropeAfricaIcon ,ScaleIcon,ClockIcon, UserIcon, TrashIcon } from 'react-native-heroicons/outline'
import { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { firestore } from '../../firebase'

const UserPostScreen = ({route}) => {
  const navigation = useNavigation();
  const mapRegion = {
    latitude: route.params.latitude,
    longitude: route.params.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const deletePost = async () => {
    await firestore.collection("posts").doc(postId).delete();
    alert("Succesfully deleted post!");
    navigation.navigate("UserPage");
  };
  
  const [offers, setOffers] = useState([]);
  let postId = route.params.uniqueid;

  useEffect(() => {
    firestore.collection("offers")
    .onSnapshot(querrySnapshot => {
      const tempOffers = [];

      querrySnapshot.forEach(documentSnapshot => {
          const buffer = documentSnapshot.data();
          if(buffer.postUniqueid === postId){
            tempOffers.push({
              ...buffer
            });
          }
      });

      setOffers(tempOffers);
    });
  }, []);

  return (
   <SafeAreaView>

    <View className="mx-4 mt-4 items-center">

      <Animatable.Image 
      animation="zoomIn"
      style={{
        borderRadius: 40,
      }}
      className="h-60 w-full" 
      source={{
      uri: route.params.imgurl
     }} />

<TouchableOpacity onPress={deletePost}> 
    <Animatable.View 
    animation="fadeInLeft"
    style={{
      opacity: 0.5,
      position: 'absolute',
      left: "27%",
      top: -220
    }} className="items-center justify-center bg-[#e42f2f] opacity-50 w-[60px] h-[60px] rounded-full"> 
        <TrashIcon size={30} color="black" />
    </Animatable.View>
    </TouchableOpacity>

    </View>
    <View className='items-center '> 
     <Animatable.Text className="font-bold text-[25px] text-[#086b2e] "> {route.params.title}  </Animatable.Text></View>
     <View className='flex-row items-center mx-4'>
     <GlobeEuropeAfricaIcon color='#086b2e' opacity={0.5} size={22}/>
     <Animatable.Text className="text-gray-400 text-[15x] font-bold"> Material: {route.params.material}</Animatable.Text>
     </View>
     
     <Animatable.Text className="text-gray-400 text-[15px] bg-white p-2 rounded-lg mx-4"> {route.params.description} </Animatable.Text>

    <View style={styles.textContainer}>
      <Text className="font-bold mt-5 mb-3 text-2xl">
        Offers
      </Text>
    </View>

    <FlatList 
      animation="fadeInLeft"
        contentContainerStyle={{alignItems: 'center'}}
        data={offers}
        scroll
        renderItem={({item}) => (
          <TouchableOpacity style={{
            alignItems: "center", borderWidth: 2, 
            marginBottom: 10, padding: 5, 
            width: "100%", borderRadius: 10,
            }}>
            <Text>{item.companyName} will take your waste for {item.money}</Text>
            <Text className="text-green-500">({item.phoneNumb})</Text>
          </TouchableOpacity>
        )}
      />

   </SafeAreaView>
  )
}

export default UserPostScreen

const styles = StyleSheet.create({
mapContainer: {
  width: "100%",
  marginTop: 85,
  alignItems: "center"
},

map: {
  width: "100%",
  height: 200,
},

textContainer: {
  alignItems:"center"
},
});