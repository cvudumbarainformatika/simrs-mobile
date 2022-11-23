import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { ROUTES } from '../constants'
import BottomTabNavigator from './BottomTabNavigator'
import { TRANSITION_HORIZONTAL } from '../constants/transitions'
import Logout from '../screens/Logout'
import Timeout from '../screens/Timeout'

const AppStack = () => {

  const Stack = createStackNavigator()
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerShown: false,
        gestureDirection: 'horizontal',
      }}
      initialRouteName={ROUTES.HOME}
    >
      <Stack.Screen name={ROUTES.HOME} component={BottomTabNavigator} options={ TRANSITION_HORIZONTAL } />
      <Stack.Screen name={ROUTES.LOGOUT} component={Logout} options={TRANSITION_HORIZONTAL} />
      <Stack.Screen name={ROUTES.ERROR_TIMEOUT} component={Timeout} options={TRANSITION_HORIZONTAL} />
    </Stack.Navigator>
  )
}

export default AppStack