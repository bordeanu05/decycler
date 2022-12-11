import { View, Text, Image } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';


const HomeScreen = () => {
  const navigation = useNavigation();
  
   useLayoutEffect(() => {
     navigation.setOptions({
        headerShown: false,
     });    

   }, [])
  return (
   <SafeAreaView> 
   
    <View className="bg-gray-200 h-full w-full items-center">
      <Text > Decycler </Text>
    </View>

    </SafeAreaView>
    
  )
}

export default HomeScreen