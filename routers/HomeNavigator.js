import { Easing } from 'react-native'
import React from 'react'

import { ROUTES } from '../constants';
import { TRANSITION_HORIZONTAL } from '../constants/transitions';
import KategoriJadwalScreen from '../screens/jadwal/KategoriJadwalScreen';
import { CardStyleInterpolators, createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { HomeScreen, JadwalScreen } from '../screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SetJadwalAwalScreen from '../screens/jadwal/SetJadwalAwalScreen';


const Stack = createStackNavigator();

const HomeNavigator = () => {
  // console.log(Stack)
  return (
      <Stack.Navigator 
          screenOptions={{
            headerShown: false,
            gestureDirection: 'horizontal',
            
      }}
      initialRouteName={ROUTES.HOME}
    >
      <Stack.Screen name={ROUTES.HOME} component={HomeScreen} />
      {/* <Stack.Screen name={ROUTES.KATEGORY_JADWAL} component={KategoriJadwalScreen} options={{
        headerMode:'screen',
        headerShown:false,
        presentation: 'transparentModal',
        cardStyle: {
          backgroundColor: 'transparent',
        },
        ...TransitionPresets.ModalSlideFromBottomIOS,
      }} /> */}
    </Stack.Navigator>
  )
}
export default HomeNavigator