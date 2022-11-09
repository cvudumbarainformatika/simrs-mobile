import { View, Text, Easing } from 'react-native'
import React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';

// TRANSITIONS =======================
const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 1,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const closeConfig = {
  animation: 'timing',
  config: {
    duration: 100,
    easing: Easing.linear,
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

// Auth ROUTE =======================================
const LoginStack = createStackNavigator();

const LoginNavigator = () => {
  return (
      <LoginStack.Navigator
          screenOptions={{
            gestureEnabled: true,
            headerShown:false
        }}
      >
      <LoginStack.Screen name="LoginScreen" component={LoginScreen} />
    </LoginStack.Navigator>
  )
}





// +++++++++++++++++++++++===================END ROUTE
const Stack = createStackNavigator()

const Navigations = () => {
  return (
    <NavigationContainer>
        <LoginNavigator />
    </NavigationContainer>
  )
}

export default Navigations