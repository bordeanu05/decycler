import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { TouchableOpacity } from 'react-native'

const Header = ({title}) => {
  return (
    <View className="justify-between"> 
    <TouchableOpacity> 
    <View className="pr-8 flex-row items-center">  
    <ChevronLeftIcon color="green" size={30}/>
      <Text className="font-bold text-[30px]">{title}</Text>
      </View>
      </TouchableOpacity>
      
    </View>
  )
}

export default Header