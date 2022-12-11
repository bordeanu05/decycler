import { View, Text, TouchableOpacity} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'
import ProfileRow from './components/ProfileRow';
import * as Animatable from 'react-native-animatable';
import { ScrollView } from 'react-native-gesture-handler';
import { EnvelopeIcon } from 'react-native-heroicons/outline';

import { auth, firestore } from '../firebase';

import { useEffect } from 'react';
import { useState } from 'react';

import { FlatList } from 'react-native';
import { Image } from 'react-native';

import { MapIcon ,GlobeEuropeAfricaIcon ,ScaleIcon,ClockIcon } from 'react-native-heroicons/outline'



const ProfileScreen = ({
    navigation,
    firstname
}) => {
    const [userData, setData] = useState('');
    const [posts, setPosts] = useState([]);
  
    useEffect(() => {
      firestore.collection("users")
      .doc(auth.currentUser.uid).get()
      .then(snapshot => {
        if(snapshot.exists){
          setData(snapshot.data());
        }
      });
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

      let firstName = "First name: " + userData.firstname;
      let lastName = "Last name: " + userData.lastname;
      let email = "Email: " + userData.email;

  return (

    <SafeAreaView className="mx-3 items-center">
    
    {/* Header */}

<Animatable.View
className="items-center"
animation="fadeInDown"
>
<Text className="text-[25px]"> Hello, <Text className="text-[#086b2e] font-bold">{userData.firstname}</Text>! </Text>
</Animatable.View>

        {/* Randuri nume/prenume/email */}
    <ProfileRow title={firstName}/> 
    <ProfileRow title={lastName}/>
    <ProfileRow title={email}/>

      {/*Active Orders*/}
      
    <Text className="mt-5 mb-5 font-bold text-2xl">Post History</Text>

      <FlatList 
      animation="fadeInLeft"
        //style={{borderWidth: 3, borderRadius: 10, padding: 30}}
        data={posts}
        renderItem={({item}) => (
          <View 
          className="shadow mb-10 bg-green-500 rounded-lg">
            <Text className="text-[#050505] font-bold text-lg pt-1 pl-4">{item.title}</Text>
            <View className='px-3 pb-4'>
              <View className='flex-row space-x-8'>
              <View className='flex-row items-center space-x-1'>
                <GlobeEuropeAfricaIcon color='#086b2e' opacity={0.5} size={22}/>
                <Text className='text-gray-500 text-xs'>
                    <Text className='text-gray-500 font-bold'>{item.material} 
                    </Text>

                </Text>
            </View>

                <View className='flex-row items-center space-x-1'>
                <ScaleIcon color='#086b2e' opacity={0.5} size={22}/>
                  <Text className='text-gray-500 text-xs'>
                    <Text className='text-gray-500 font-bold'>
                      {item.weight} 
                    </Text>
                  </Text>
                  </View>
                </View>
              </View>
          </View>
        )}
      />

      {/*Logout*/}


    <TouchableOpacity 
    onPress={() => {
        auth.signOut();
        navigation.navigate("LoginAsPers");
    }}
    className="items-center"
    style={{    
    }}
    >
   
    <Animatable.Text
    className="underline decoration-2 font-bold text-[20px] mt-5"
    animation="fadeIn" > 
    Log Out
    </Animatable.Text>

     </TouchableOpacity>
    </SafeAreaView>
  )
}

export default ProfileScreen

