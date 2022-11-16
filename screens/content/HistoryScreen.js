import { View, Text, useWindowDimensions, StatusBar } from 'react-native'
import React from 'react'
import { CONFIGSPRING, tw } from '../../constants'
import { AppBtn } from '../../components'
import Animated, { useAnimatedGestureHandler, useSharedValue, useAnimatedStyle, withSpring} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

const HistoryScreen = () => {

  const dimensions = useWindowDimensions();

  const top = useSharedValue(
    dimensions.height
  )

  const style = useAnimatedStyle(() => {
    return {
      top: withSpring(top.value, CONFIGSPRING.SATU)
    }
  })

  const gestureHandler = useAnimatedGestureHandler({
    onStart(_, context) {
      context.startTop = top.value
    },
    onActive(event, context) {
      top.value = context.startTop + event.translationY
    },
    onEnd() {
      // Dimensions snap Point
      if (top.value > dimensions.height / dimensions.height + StatusBar.currentHeight + 200) {
        top.value = dimensions.height
      } else {
        top.value = dimensions.height / dimensions.height + StatusBar.currentHeight
      }
    }
  }); 
  return (
    <>
      <View style={tw`flex-1 bg-gray-light justify-center items-center`}>
        <Text>HistoryScreen</Text>
        <AppBtn label="Open Bottom Sheet" clicked={() => {
          top.value = withSpring(
            dimensions.height / dimensions.height + StatusBar.currentHeight, // ini pengturannya
            CONFIGSPRING.SATU
          )
        }} />
      </View>

      <PanGestureHandler onGestureEvent={gestureHandler} >
        <Animated.View
          style={[{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            top: dimensions.height,
            backgroundColor: 'white',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height:2
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            padding: 20,
            justifyContent: 'center',
            alignItems: 'center'
          },
          style
          ]}
        >

          <Text>Sheeet</Text>
          <AppBtn label="Close Bottom Sheet" clicked={() => {
          top.value = withSpring(
            dimensions.height,
            CONFIGSPRING.SATU
          )
        }} />
        </Animated.View>

      </PanGestureHandler>
    </>
    
  )
}

export default HistoryScreen