import { Easing } from 'react-native'
import React from 'react'

import { ROUTES } from '../constants';
import { TRANSITION_HORIZONTAL } from '../constants/transitions';
import KategoriJadwalScreen from '../screens/jadwal/KategoriJadwalScreen';
import { CardStyleInterpolators, createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { AbsenScreen, HomeScreen, JadwalScreen } from '../screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SetJadwalAwalScreen from '../screens/jadwal/SetJadwalAwalScreen';
import LoadingSpecial from '../screens/home/LoadingSpecial';


const Stack = createStackNavigator();
const RootStack = createStackNavigator();
const AbsenNavigator = () => {
  // console.log(Stack)
  return (
      <RootStack.Navigator>
        <RootStack.Group>
          <RootStack.Screen name={ROUTES.ABSEN} component={AbsenScreen} options={{headerShown:false}}/>
        </RootStack.Group>
      <RootStack.Group screenOptions={{
        presentation: 'modal',
        headerShown:false,
      }} >
          <RootStack.Screen name={ROUTES.LOADING_SPECIAL} component={LoadingSpecial} />
        </RootStack.Group>
    </RootStack.Navigator>
  )
}
export default AbsenNavigator