import { View, Text } from 'react-native'
import React from 'react'
import { tw } from '../../constants'

const HomeScreen = () => {
  return (
    <View style={tw`flex-1 bg-gray-light justify-center items-center`}>
      <Text>HomeScreen</Text>
    </View>
  )
}

export default HomeScreen