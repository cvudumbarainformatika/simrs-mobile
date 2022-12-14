import { Easing } from 'react-native'
import React, { useEffect } from 'react'

import { ROUTES } from '../constants';
import { closeSring, openSring, TRANSITION_HORIZONTAL, TRANSITION_VERTICAL } from '../constants/transitions';
import KategoriJadwalScreen from '../screens/jadwal/KategoriJadwalScreen';
import { CardStyleInterpolators, createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { HomeScreen, JadwalScreen } from '../screens';




const HomeNavigator = () => {

  const RootStack = createStackNavigator();
  
  return (
    <RootStack.Navigator>
        {/* <RootStack.Group > */}
          <RootStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        {/* </RootStack.Group> */}
      
        {/* GROUP MODAL SLIDE  */}
        {/* <RootStack.Group screenOptions={{
          presentation: 'modal',
          headerShown: false,
          gestureDirection: 'vertical',
          transitionSpec: {
              open: openSring,
              close: closeSring
        },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
          
        }} >
          <RootStack.Screen name={ROUTES.SET_JADWAL_AWAL} component={SetJadwalAwalScreen} />
          <RootStack.Screen name={ROUTES.PILIH_KATEGORI_JADWAL_AWAL} component={PilihKategoriJadwal} />
        </RootStack.Group> */}
      </RootStack.Navigator>
  )
}
export default HomeNavigator