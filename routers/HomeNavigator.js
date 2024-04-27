import { Easing } from 'react-native'
import React, { useEffect } from 'react'

import { ROUTES } from '../constants';
import { closeSring, openSring, TRANSITION_HORIZONTAL, TRANSITION_VERTICAL } from '../constants/transitions';
import KategoriJadwalScreen from '../screens/jadwal/KategoriJadwalScreen';
import { CardStyleInterpolators, createStackNavigator, TransitionPresets } from '@react-navigation/stack';
// import { HomeScreen, JadwalScreen } from '../screens';
import HomeScreenV2 from '../screens/content/HomeScreenV2';
// import XenterScreen from '../screens/home/eXenter/xenterScreen';
import XenterNavigator from '../screens/home/eXenter/XenterNavigator';
import Logout from '../screens/Logout';
import UploadNavigator from '../screens/home/eUpload/UploadNavigator';


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
      initialRouteName={ROUTES.HOME}
    >
      {/* <RootStack.Group > */}
      <RootStack.Screen name={ROUTES.HOME} component={HomeScreenV2} />
      <RootStack.Screen name={ROUTES.XENTER_NAV} component={XenterNavigator} />
      <RootStack.Screen name={ROUTES.UPLOAD_DOK_NAV} component={UploadNavigator} options={transition}
        
      />

      <RootStack.Screen name={ROUTES.LOGOUT} component={Logout} />
    </RootStack.Navigator>
  )
}
export default HomeNavigator