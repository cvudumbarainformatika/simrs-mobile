import React, {createContext, useState} from 'react'

import { ROUTES } from '../constants';
import { closeSring, openSring, TRANSITION_HORIZONTAL } from '../constants/transitions';
import { CardStyleInterpolators, createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import QrScan from '../screens/absen/QrScan';
import LoadingAbsen from '../screens/absen/LoadingAbsen';
import ScreenAbsenV4 from '../screens/absen/ScreenAbsenV4';
import { AbsenProvider } from '../context/AbsenContext';
import { NavigationContainer } from '@react-navigation/native';
import QrScanV2 from '../screens/absen/QrScanV2';


const Stack = createStackNavigator();

const NavigationAbsen = () => {
  return (
    <Stack.Navigator
        screenOptions={{
          presentation: 'modal',
          headerShown: false,
          gestureDirection: 'horizontal',
          transitionSpec: {
            open: openSring,
            close: closeSring
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        initialRouteName={ROUTES.SCREEN_ABSEN_AWAL}
      >
        <Stack.Screen name={ROUTES.SCREEN_ABSEN_AWAL} component={ScreenAbsenV4} />
        <Stack.Screen name={ROUTES.QR_SCAN} component={QrScanV2} options={{
          unmountOnBlur: true,
        }} />
        <Stack.Screen name={ROUTES.ABSEN_LOADING} component={LoadingAbsen} />
      </Stack.Navigator>
  )
}

const AbsenNavigator = () => {
  return (
    <AbsenProvider>
      {/* <NavigationContainer> */}
        <NavigationAbsen />
      {/* </NavigationContainer> */}
    </AbsenProvider>
  )
};
export default AbsenNavigator