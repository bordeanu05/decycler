import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { ChatBubbleBottomCenterIcon, ChatBubbleLeftEllipsisIcon } from 'react-native-heroicons/outline';

//<TouchableOpacity> 
 //    <ChatBubbleLeftEllipsisIcon
 //    onPress={() => {navigation.navigate("Chat")}}
  //   style={{
   //   position: "absolute",
  //    top: 230
   //  }}
    //  color="gray" size={60}/>
    //  </TouchableOpacity>

const DecideScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className=" bg-gray-100 justify-center items-center space-y-10">
    
     <Animatable.Image 
        className=" mt-[50px] h-[199px] w-[199px]"
      source={require('../assets/logo.png')}
      animation="slideInUp"
      />
      <TouchableOpacity onPress={() => {navigation.navigate("LoginAsPers")}} >
  <Animatable.Text 
  style={{
    elevation: 20,
  }}
  animation="fadeInLeft"
        className="bg-[#086b2e] rounded-full p-7 text-center text-white font-bold text-[20px]">
         I want to give it away
        </Animatable.Text>
        </TouchableOpacity>

      <Animatable.Text 
      animation="fadeInDown"
      className="text-center text-[#022b26] font-bold text-[20px]">
      What do you want to do with the waste ?
      </Animatable.Text>

        <TouchableOpacity  onPress={() => {navigation.navigate("LoginAsComp")}}>
        <Animatable.Text 
        style={{
          elevation:20
        }}
        animation="fadeInRight"
        className="bg-[#086b2e] p-7 rounded-full text-center text-white font-bold text-[20px]">
         I want to take it away
        </Animatable.Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
}

export default DecideScreen;
