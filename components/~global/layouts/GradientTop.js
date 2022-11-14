import { View, Text } from 'react-native'
import React from 'react'
import { tw } from '../../../constants'
import { LinearGradient } from 'expo-linear-gradient'

const GradientTop = () => {
  return (
    <View style={tw`absolute w-full h-60 top-0`}>
      <LinearGradient
        colors={[tw.color('secondary'), tw.color('primary')]}
        start={{ x: 1, y: 0 }}
        end={{x:1,y:1}}
        className="h-full w-full rounded-br-[50px] rounded-bl-[50px]" />
    </View>
  )
}

export default GradientTop