import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native'

const LoadingSpecial = () => {
    const navigation = useNavigation()

    useEffect(()=> {})
  return (
    <View className="flex-1 justify-center items-center bg-primary">
      <Text>LoadingSpecial</Text>
    </View>
  )
}

export default LoadingSpecial