import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import * as Animatable from 'react-native-animatable'
import * as Progress from 'react-native-progress'
import { LinearGradient } from 'expo-linear-gradient'
import { IMGS, tw } from '../../constants'

const AppLoaderAnim = ({ visible = false }) => {
    return (
      // visible && (
    <View style={[styles.container]}>
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
        animation="fadeIn"
        iterateCount={1}
        className="text-lg my-10 text-white font-bold text-center"
      >
        UOBK RSUD MOH SALEH
      </Animatable.Text>
        <Progress.Circle size={60} indeterminate={true} color={'white'} />
      </LinearGradient>
    </View>
  )
  // )
}

export default AppLoaderAnim

const styles = StyleSheet.create({
  container: {
        flex: 1,
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right:0,
        zIndex: 10,
        justifyContent:'center'
    },
  });