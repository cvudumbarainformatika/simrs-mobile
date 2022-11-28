import { Easing } from 'react-native'
import React from 'react'

// import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import { HomeScreen, SettingsScreen } from '../screens'

import { ROUTES } from '../constants';
import SettingsDetailScreen from '../screens/settings/SettingsDetailScreen';
import Logout from '../screens/Logout';

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

// Auth ROUTE =======================================
const Stack = createStackNavigator();

const SettingsNavigator = () => {
  // console.log(Stack)
  return (
      <Stack.Navigator
          screenOptions={{
            gestureEnabled: true,
            headerShown: false,
            gestureDirection: 'horizontal',
      }}
      initialRouteName={ROUTES.LOGIN}
      >
      <Stack.Screen name={ROUTES.SETTINGS} component={SettingsScreen} options={transition} />
      <Stack.Screen name={ROUTES.SETTINGS_DETAIL} component={SettingsDetailScreen} options={transition} />
      <Stack.Screen name={ROUTES.LOGOUT} component={Logout} options={transition} />
    </Stack.Navigator>
  )
}
export default SettingsNavigator