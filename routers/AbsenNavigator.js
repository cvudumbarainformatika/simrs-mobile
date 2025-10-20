import React, { createContext, useState } from 'react'

import { ROUTES } from '../constants';
import { closeSring, openSring, TRANSITION_HORIZONTAL } from '../constants/transitions';
import { CardStyleInterpolators, createStackNavigator, TransitionPresets } from '@react-navigation/stack';
// import QrScan from '../screens/absen/QrScan.bak';
import LoadingAbsen from '../screens/absen/LoadingAbsen';
import ScreenAbsenV4 from '../screens/absen/ScreenAbsenV4';
// import { NavigationContainer } from '@react-navigation/native';
import QrScanV2 from '../screens/absen/QrScanV2';
import FaceScan from '../screens/absen/FaceScan';
import AbsenMap from '../screens/absen/AbsenMap';
import CekLokasi from '../screens/absen/CekLokasi';
// import store from '../redux/store'
// import { Text } from 'react-native';
import { AbsenProvider } from '../context/AbsenContext';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { SafeAreaProvider } from 'react-native-safe-area-context';

// console.log('oooi')
const Stack = createStackNavigator();

const NavigationAbsen = () => {
  console.log('navigation absen')
  return (
    <Stack.Navigator
      screenOptions={{
        presentation: 'modal',
        headerShown: false,
        gestureEnabled: true,
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
      <Stack.Screen name={ROUTES.CEK_LOKASI} component={CekLokasi} />
      <Stack.Screen name={ROUTES.QR_SCAN} component={QrScanV2} options={{
        unmountOnBlur: true,
      }} />
      <Stack.Screen name={ROUTES.ABSEN_MAP} component={AbsenMap} />
      <Stack.Screen name={ROUTES.FACE_SCAN} component={FaceScan} options={{
        unmountOnBlur: true,
      }} />
      <Stack.Screen name={ROUTES.ABSEN_LOADING} component={LoadingAbsen} />
    </Stack.Navigator>
  )
}

const AbsenNavigator = () => {
  console.log('absenNavigator')
  return (

    <AbsenProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
        <NavigationAbsen />
      </SafeAreaView>
    </AbsenProvider>
  )
};
export default AbsenNavigator