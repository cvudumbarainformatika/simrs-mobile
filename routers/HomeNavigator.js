import { Easing } from 'react-native'
import React, { useEffect } from 'react'

import { ROUTES } from '../constants';
import { closeSring, openSring, TRANSITION_HORIZONTAL, TRANSITION_VERTICAL } from '../constants/transitions';
import KategoriJadwalScreen from '../screens/jadwal/KategoriJadwalScreen';
import { CardStyleInterpolators, createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { HomeScreen, JadwalScreen } from '../screens';
import HomeScreenV2 from '../screens/content/HomeScreenV2';


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


const HomeNavigator = () => {

  const RootStack = createStackNavigator();

  return (
    <RootStack.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerShown: false,
        gestureDirection: 'horizontal',
      }}
      initialRouteName="Home"
    >
      {/* <RootStack.Group > */}
      <RootStack.Screen name="Home" component={HomeScreenV2} options={{ headerShown: false }} />
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