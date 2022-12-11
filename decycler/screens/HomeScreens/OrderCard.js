import { View, Text, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { StarIcon } from 'react-native-heroicons/solid'
import { MapIcon ,GlobeEuropeAfricaIcon ,ScaleIcon,ClockIcon } from 'react-native-heroicons/outline'

const OrderCard = (
    {
        id,
        imgUrl,
        title,
        material,
        short_description,
        weight,
        long,
        lat,

    }
) => {
  return (
    <TouchableOpacity 
    className=" bg-white shadow mb-5">
        <Image
        source={{
            uri:"imgUrl",
        }}
        className=" h-[200px] w-full rounded-md"
        />
        <Text className="text-[#050505] font-bold text-lg pt-1 pl-4">{title}</Text>
        <View className='px-3 pb-4'>
            <View className='flex-row space-x-8'>
            <View className='flex-row items-center space-x-1'>
                <GlobeEuropeAfricaIcon color='#086b2e' opacity={0.5} size={22}/>
                <Text className='text-gray-500 text-xs'>
                    <Text className='text-gray-500'>{material} 
                    </Text>

                </Text>
            </View>

            <View className='flex-row items-center space-x-1'>
                <ScaleIcon color='#086b2e' opacity={0.5} size={22}/>
                <Text className='text-gray-500 text-xs'>
                    <Text className='text-gray-500'>{weight}
                    </Text>

                </Text>
            </View>
            </View>
        
        </View>
    </TouchableOpacity>
  )
}

export default OrderCard