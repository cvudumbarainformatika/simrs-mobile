import { View, Text } from 'react-native'
import React from 'react'
import { tw } from '../../../constants'
import { LinearGradient } from 'expo-linear-gradient'

const BackgroundPage = () => {
  return (
      <View style={tw`absolute bottom-0 top-0 left-0 right-0 -z-10`}>
          <LinearGradient
                colors={[tw.color('secondary'), tw.color('primary')]}
                start={{ x: 1, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={tw`h-60`}
          />
          <View style={tw`flex-1 bg-gray-light`} />
    </View>
  )
}

export default BackgroundPage