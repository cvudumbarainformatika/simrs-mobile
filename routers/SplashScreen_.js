import { View, Text } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { tw } from '../constants'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../context/AuthContext'

const SplashScreen_ = () => {
  return (
    <View style={{flex:1, backgroundColor:tw.color('primary')}}>
      <Text>SplashScreen</Text>
    </View>
  )
}

export default SplashScreen_