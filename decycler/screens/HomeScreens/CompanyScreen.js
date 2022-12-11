import { View, Text, Image, TextInput, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import{
  UserIcon,
  MagnifyingGlassIcon,

} from "react-native-heroicons/outline";
import { SafeAreaView } from 'react-native-safe-area-context';
import Categories from './Categories';
import FeaturedRow from './FeaturedRow';

import { auth, firestore } from '../../firebase';
import { FlatList } from 'react-native';

import { TouchableOpacity } from 'react-native';

import { MapIcon ,GlobeEuropeAfricaIcon ,ScaleIcon,ClockIcon } from 'react-native-heroicons/outline'

const CompanyScreen = ({navigation}) => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        firestore.collection("posts")
        .onSnapshot(querrySnapshot => {
          const tempPosts = [];
    
          querrySnapshot.forEach(documentSnapshot => {
              const buffer = documentSnapshot.data();
              tempPosts.push(buffer);
              }
          );
    
          setPosts(tempPosts);
        });
      }, []);

  return (
    <SafeAreaView className='bg-white pt-2'>
    {/* Header */}  
    <View className='flex-row items-center pt-2'>
    <View className='px-3 pb-3' >
    <TouchableOpacity
    onPress={()=>{navigation.navigate("ProfileCompany")}}
    > 
      <UserIcon size={35} color='#086b2e'/>   
      </TouchableOpacity>
      </View>

              <View className='items-center pb-3'>
                <Text className='font-bold text-[25px] text-[#086b2e]'>Orders</Text>
        </View>
  
        <View className=' mx-3 space-x-2  pb-3'>
      
      
    </View>
        </View>          
        <View className='flex-row items-center mx-4 pb-3 space-x-2'>
          <View className='flex-row space-x-2 items-center bg-gray-200 p-3 rounded-lg flex-1'>
            <MagnifyingGlassIcon size={20} color='gray'/>
            <TextInput 
            placeholder='Search for orders'
            keyboardType='default'
            />
        </View>
    </View>

    <FlatList 
      className='bg-gray-100 '
      contentContainerStyle={{
        paddingBottom:130,

        }}
        data={posts}
        renderItem={({item}) => (
          
          <TouchableOpacity 
          onPress={() => {navigation.navigate("CompanyPost",{
            imgurl: item.imgurl,
            weight: item.weight,
            material: item.material,
            title: item.title,
            description: item.description,
            longitude: item.longitude,
            latitude: item.latitude,
            uniqueid: item.uniqueid,
            user: item.user,

          })}}
          className="bg-white shadow mb-5 mt-4 mx-4  rounded-lg">
            <Image source={{uri: item.imgurl}}
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

    </SafeAreaView>
  )
}

export default CompanyScreen