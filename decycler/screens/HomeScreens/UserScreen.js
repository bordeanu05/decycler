import { View, Text, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import{
  UserIcon,
  ChevronDownIcon,
  SearchIcon,
  AdjustmentsVerticalIcon,
  MagnifyingGlassIcon,

} from "react-native-heroicons/outline";
import { SafeAreaView } from 'react-native-safe-area-context';
import Categories from './Categories';
import FeaturedRow from './FeaturedRow';
import { auth, firestore } from '../../firebase';
import { FlatList } from 'react-native-gesture-handler';
import OrderCard from './OrderCard';

import { StarIcon } from 'react-native-heroicons/solid'
import { MapIcon ,GlobeEuropeAfricaIcon ,ScaleIcon,ClockIcon } from 'react-native-heroicons/outline'


const UserScreen = ({navigation}) => {
  const [userData, setData] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    firestore.collection("users")
    .doc(auth.currentUser.uid).get()
    .then(snapshot => {
      if(snapshot.exists){
        setData(snapshot.data());
      }
    })
  }, []);

  useEffect(() => {
    firestore.collection("posts")
    .onSnapshot(querrySnapshot => {
      const tempPosts = [];

      querrySnapshot.forEach(documentSnapshot => {
          const buffer = documentSnapshot.data();
          if(buffer.user === auth.currentUser.uid){
            tempPosts.push({
              ...buffer
            });
          }
      });

      setPosts(tempPosts);
    });
  }, []);

  return (
    <SafeAreaView className='bg-white pt-1'>
    {/* Header */}  
    <View className='flex-row items-center '> 
       <TouchableOpacity onPress={()=>{navigation.navigate("Profile")}}
       className='px-3 pb-3' >
      <UserIcon 
      size={35} color='#086b2e'/>   
      </TouchableOpacity>

      <View className='flex-1 items-center'>
      <Text className='font-bold text-[#086b2e] text-lg'>Your Posts</Text>
      </View>

    <View className=' items-end mx-3 space-x-2 pb-4 '>
      <Image 
        source={require("../logo2.png")}
        className='h-12 w-12 p-4 rounded-full'
      />
      
    </View> 


     </View>
     {/* Listings */}
      <FlatList 
      className='bg-gray-100 '
      contentContainerStyle={{
        paddingBottom:70,

        }}
        data={posts}
        renderItem={({item}) => (
          
          <TouchableOpacity 
          onPress={() => {navigation.navigate("UserPost",{
            img: item.imgUrl,
            weight: item.weight,
            material: item.material,
            title: item.title,
            description: item.description,
            longitude: item.longitude,
            latitude: item.latitude,
            imgurl: item.imgurl,
            uniqueid: item.uniqueid,
          })}}
          className="bg-white shadow mb-5 mt-4 mx-4  rounded-lg">
            <Image source={{uri:item.imgurl}}
              className=" h-[200px] w-full rounded-md"/>
            <Text className="text-[#050505] font-bold text-lg pt-1 pl-4">{item.title}</Text>
            <View className='px-3 pb-4'>
              <View className='flex-row space-x-8'>
              <View className='flex-row items-center space-x-1'>
                <GlobeEuropeAfricaIcon color='#086b2e' opacity={0.5} size={22}/>
                <Text className='text-gray-500 text-xs'>
                    <Text className='text-gray-500'>{item.material} 
                    </Text>

                </Text>
            </View>

                <View className='flex-row items-center space-x-1'>
                <ScaleIcon color='#086b2e' opacity={0.5} size={22}/>
                  <Text className='text-gray-500 text-xs'>
                    <Text className='text-gray-500'>
                      {item.weight} 
                    </Text>
                  </Text>
                  </View>
                </View>
              </View>
          </TouchableOpacity>

        )}
      />
      
     <TouchableOpacity 
     onPress={() => {
      navigation.navigate('AddNewPost')
     }}
     className='bg-[#086b2e] rounded-full'style={{  
            alignSelf:'center',
            position: 'absolute',
            top: '85%',
            height: 60,
            width: '40%',
            justifyContent: 'center',
            alignItems: 'center',
            elevation:20,
            }}>

              <Text className='text-white font-bold' style={{
              }}>New Post</Text>
      </TouchableOpacity>

    </SafeAreaView>
  )
}

export default UserScreen