import React from 'react'

import { ROUTES } from '../constants';
import { closeSring, openSring, TRANSITION_HORIZONTAL } from '../constants/transitions';
import { CardStyleInterpolators, createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import ScreenAbsenAwal from '../screens/absen/ScreenAbsenAwal';
import QrScan from '../screens/absen/QrScan';
import LoadingAbsen from '../screens/absen/LoadingAbsen';
import ScreenAbsenV from '../screens/absen/ScreenAbsenV';
import ScreenAbsenVv from '../screens/absen/ScreenAbsenVv';


const Stack = createStackNavigator();
// const RootStack = createStackNavigator();
const AbsenNavigator = () => {
  // console.log(Stack)
  return (
    <Stack.Navigator
      screenOptions={{
        presentation: 'modal',
        headerShown:false,
        gestureDirection: 'vertical',
        transitionSpec: {
          open: openSring,
          close: closeSring
        },
        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
      }}
      initialRouteName={ROUTES.SCREEN_ABSEN_AWAL}
    >
          <Stack.Screen name={ROUTES.SCREEN_ABSEN_AWAL} component={ScreenAbsenVv} />
          <Stack.Screen name={ROUTES.QR_SCAN} component={QrScan} options={{ 
            unmountOnBlur:true,
           }} />
          <Stack.Screen name={ROUTES.ABSEN_LOADING} component={LoadingAbsen} /> 
    </Stack.Navigator>
  )
}
export default AbsenNavigator