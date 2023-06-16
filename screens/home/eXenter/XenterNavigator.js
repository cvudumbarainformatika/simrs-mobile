import { Easing } from 'react-native'
import React, { useEffect } from 'react'

import { CardStyleInterpolators, createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { ROUTES } from '../../../constants';
import XenterScreen from './XenterScreen';


// TRANSITIONS =======================
const config = {
    animation: 'spring',
    config: {
        stiffness: 200,
        damping: 80,
        mass: 1,
        overshootClamping: false,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
    },
};

const closeConfig = {
    animation: 'timing',
    config: {
        duration: 300,
        easing: Easing.back(),
    }
}

const transition = {
    gestureDirection: 'horizontal',
    transitionSpec: {
        open: config,
        close: closeConfig
    },
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
}


const XenterNavigator = () => {

    const Stack = createStackNavigator();
    // console.log(Stack)
    return (
        <Stack.Navigator
            screenOptions={{
                gestureEnabled: true,
                headerShown: false,
                gestureDirection: 'horizontal',
            }}
            initialRouteName={ROUTES.XENTER}
        >
            <Stack.Screen name={ROUTES.XENTER} component={XenterScreen} options={transition} />
        </Stack.Navigator>
    )
}
export default XenterNavigator