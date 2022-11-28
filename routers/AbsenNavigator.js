import { Easing } from 'react-native'
import React from 'react'

import { ROUTES } from '../constants';
import { closeSring, openSring, TRANSITION_HORIZONTAL } from '../constants/transitions';
import KategoriJadwalScreen from '../screens/jadwal/KategoriJadwalScreen';
import { CardStyleInterpolators, createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { AbsenScreen, HomeScreen, JadwalScreen } from '../screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SetJadwalAwalScreen from '../screens/jadwal/SetJadwalAwalScreen';
import LoadingSpecial from '../screens/home/LoadingSpecial';
import ScreenAbsenAwal from '../screens/absen/ScreenAbsenAwal';
import QrScan from '../screens/absen/QrScan';


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
      initialRouteName={ROUTES.SCREEN_ABSEN_AWAL} >
        {/* <RootStack.Group> */}
          <Stack.Screen name={ROUTES.SCREEN_ABSEN_AWAL} component={ScreenAbsenAwal} />
      <Stack.Screen name={ROUTES.QR_SCAN} component={QrScan} options={{ 
            unmountOnBlur:true,
           }} />
          {/* <Stack.Screen name={ROUTES.ABSEN} component={AbsenScreen} options={{headerShown:false}}/> */}
          {/* <RootStack.Screen name={ROUTES.LOADING_SPECIAL} component={LoadingSpecial} /> */}
        {/* </RootStack.Group> */}
      {/* <RootStack.Group screenOptions={{
        presentation: 'modal',
        headerShown:false,
      }} > */}
          
        {/* </RootStack.Group> */}
    </Stack.Navigator>
  )
}
export default AbsenNavigator