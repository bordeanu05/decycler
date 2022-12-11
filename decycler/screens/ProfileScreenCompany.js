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

const ProfileScreenCompany = () => {
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
      
      let name = "Company Name: " + userData.name;
      let address = "Adress: " + userData.address;
      let fiscal = "Cod Fiscal: " + userData.fiscal;
      let email = "Email: " + userData.email;
      let phonenumber = "Tel: " + userData.phonenumber;
  return (
   <SafeAreaView className="mx-3 items-center"> 
   <ProfileRow title={name}/> 
   <ProfileRow title={address}/> 
    <ProfileRow title={fiscal}/>
    <ProfileRow title={email}/>
    <ProfileRow title={phonenumber}/>
   </SafeAreaView> 
  )
}

export default ProfileScreenCompany