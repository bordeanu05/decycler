import { ScrollView, Text, View } from 'react-native'
import React, { Component } from 'react'
import CategoryCard from './CategoryCard'

export class Categories extends Component {
  render() {
    return (
      <ScrollView 
      contentContainerStyle={{
        paddingHorizontal:15,
        paddingTop:10,
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
      >
        {/* CategoryCard */}

        <CategoryCard/>
      </ScrollView>
    )
  }
}

export default Categories