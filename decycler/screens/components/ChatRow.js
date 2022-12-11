import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const ChatRow = () => {
  return (
 <TouchableOpacity>

    <Image 
    className="h-[80px] w-[80px] rounded-full" 
   source={{
    uri: "https://imageio.forbes.com/specials-images/imageserve/618e7d9fdfe79744d793c0c6/0x0.jpg?format=jpg&crop=966,966,x489,y121,safe&height=416&width=416&fit=bounds"
   }}/>
    
    </TouchableOpacity>
  )
}

export default ChatRow