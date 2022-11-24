import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import * as Animatable from 'react-native-animatable'
import * as Progress from 'react-native-progress'
import { useNavigation } from '@react-navigation/native'
import { IMGS, tw } from '../../constants'
import { LinearGradient } from 'expo-linear-gradient'

const LoadingAbsen = ({navigation, route}) => {

    useEffect(()=> {})
  return (
    <View className="flex-1">
      <LinearGradient 
          className="flex-1 justify-center items-center"
          colors={[tw.color('secondary'), tw.color('primary')]}
          start={{ x: 1, y: 0 }}
          end={{x:1,y:0.9}}
      >
      <Animatable.Image
        source={IMGS.loadingAnim}
        animation="fadeIn"
        className="h-40 w-20"
        iterationCount={1}
      />
      <Animatable.Text
        animation="slideInUp"
        iterateCount={1}
        className="text-lg my-10 text-white font-bold text-center"
      >
        UOBK RSUD MOH SALEH
      </Animatable.Text>
        <Progress.Circle size={60} indeterminate={true} color={'white'} />
      </LinearGradient>
    </View>
  )
}

export default LoadingAbsen