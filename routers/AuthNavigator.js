import { Easing, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import { LoginScreen, RegisterScreen, RegistrasiPasswordScreen } from '../screens'

import { ROUTES, tw } from '../constants';
import BottomTabNavigator from './BottomTabNavigator';
import { AppLoader } from '../components';

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
      <Stack.Screen name={ROUTES.HOME} component={BottomTabNavigator} options={transition} />
    </Stack.Navigator>
  )
}





// +++++++++++++++++++++++===================END ROUTE

const AuthNavigator = () => {
  // isAuthenticated = is...
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);


  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    },1000)
  }, [])

  if (isLoading) {
    return (
      <View style={tw`flex-1 bg-primary`}>
        <AppLoader visible={isLoading} />
      </View>
    )
  }
  return (
    <NavigationContainer>
        {/* {isAuthenticated? LoginNavigator : BottomTabNavigator} */}
        <LoginNavigator />
    </NavigationContainer>
  )
}

export default AuthNavigator