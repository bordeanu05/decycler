import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import OrderCard from './OrderCard'

const FeaturedRow = ({id,title,description}) => {
  return (
    <View>

      <ScrollView
      contentContainerStyle={{
        paddingHorizontal:15,
      }}
      showsHorizontalScrollIndicator={false}
      >
        {/* OrderCards */}
        <OrderCard
                id={1}
                imgUrl='https://storage.spatiulconstruit.ro/storproc/gallery/h14/f1447/gallery_item/5782/5782_moloz_recyclingmachinesco.jpg'
                title='Moloz'
                material='Metal'
                greutate={50}
                address="dacia"

        
        />
                <OrderCard
                title='Cauciuce'
                id={3}
                imgUrl='https://static.automarket.ro/img/auto_resized/db/article/080/381/330447l-1000x640-b-27a01bf9.jpg'
                material='Cauciuc'
                address='dorobanti'
                greutate={100}
        
        />
        
      </ScrollView>
    </View>
  )
}

export default FeaturedRow