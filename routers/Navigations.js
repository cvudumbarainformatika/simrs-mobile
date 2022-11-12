import { View, Text, Easing } from 'react-native'
import React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import RegistrasiPasswordScreen from '../screens/RegistrasiPasswordScreen';

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
            headerShown: false,
            gestureDirection: 'horizontal',
        }}
      >
      <LoginStack.Screen name="Login" component={LoginScreen} options={transition} />
      <LoginStack.Screen name="Register" component={RegisterScreen} options={transition} />
      <LoginStack.Screen name="RegistrasiPassword" component={RegistrasiPasswordScreen} options={transition} />
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