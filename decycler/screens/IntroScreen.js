import { View, Text, Image } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';


const IntroScreen = () => {
  const navigation = useNavigation();
  
   useLayoutEffect(() => {
     navigation.setOptions({
        headerShown: false,
     });    
   })

setTimeout(() => {
    navigation.navigate("Decide");
   }, 1500); 
  return (

    <View className="bg-[#022b26] h-full w-full items-center">
      <Animatable.Image 
      className="top-[30%] h-[180px] w-[180px]" 
      source={require('../assets/logo.png')}
      animation="fadeInLeft"
      
      />
      <Animatable.Text 
      className="opacity-40 font-bold text-white text-[15px] top-[67%]"
      animation={"slideInUp"}> Powered by Devastation </Animatable.Text>
        
       
    </View>
    
  )
}

export default IntroScreen