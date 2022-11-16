import { View, Text, useWindowDimensions, StatusBar } from 'react-native'
import React from 'react'
import { CONFIGSPRING, tw } from '../../constants'
import Animated, { useAnimatedGestureHandler, useSharedValue, useAnimatedStyle, withSpring} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

const AppSheet = ({ open= false },props) => {
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

    const openGesture = () => {
        open? gestureHandler : null
    }
    return (
        <>
            <PanGestureHandler onGestureEvent={ openGesture} >
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

                <Text>Content</Text>
                </Animated.View>

            </PanGestureHandler>
        </>
    
  )
}

export default AppSheet