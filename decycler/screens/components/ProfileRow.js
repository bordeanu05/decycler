import { View, Text } from 'react-native'
import React from 'react'
import * as Animatable from 'react-native-animatable';
import { EnvelopeIcon, EnvelopeOpenIcon } from 'react-native-heroicons/outline';

const ProfileRow = (
    {
        title,
    }
) => {
  return (
    <Animatable.View 
    animation="zoomIn"
      style={{
        justifyContent: 'center',
        alignContent: 'center',
        width: "100%",
        padding: 10,
        height: 40,
      }}
      className="bg-slate-300 rounded-xl mt-4 justify-center">

        <Text className="font-bold"> {title} </Text>
      </Animatable.View>

  )
}

export default ProfileRow