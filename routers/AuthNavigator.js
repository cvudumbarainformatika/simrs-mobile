import { Easing } from 'react-native'
import React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import { LoginScreen, RegisterScreen, RegistrasiPasswordScreen } from '../screens'

import { ROUTES } from '../constants';

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
const Stack = createStackNavigator();

const LoginNavigator = () => {
  console.log(Stack)
  return (
      <Stack.Navigator
          screenOptions={{
            gestureEnabled: true,
            headerShown: false,
            gestureDirection: 'horizontal',
      }}
      initialRouteName={ROUTES.LOGIN}
      >
      <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} options={transition} />
      <Stack.Screen name={ROUTES.REGISTER} component={RegisterScreen} options={transition} />
      <Stack.Screen name={ROUTES.REGISTRASIPASSWORD} component={RegistrasiPasswordScreen}
        options={[
          transition,
          ({route}) => ({
            title: route.params.userId
          })
        ]}
      />
    </Stack.Navigator>
  )
}





// +++++++++++++++++++++++===================END ROUTE

const AuthNavigator = () => {
  return (
    <NavigationContainer>
        <LoginNavigator />
    </NavigationContainer>
  )
}

export default AuthNavigator