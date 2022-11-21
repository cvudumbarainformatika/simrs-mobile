import { Easing } from 'react-native'
import React from 'react'

import { ROUTES } from '../constants';
import { closeSring, openSring, TRANSITION_HORIZONTAL, TRANSITION_VERTICAL } from '../constants/transitions';
import KategoriJadwalScreen from '../screens/jadwal/KategoriJadwalScreen';
import { CardStyleInterpolators, createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { JadwalScreen } from '../screens';


const Stack = createStackNavigator();

const JadwalNavigator = () => {
  // console.log(Stack)
  return (
      <Stack.Navigator 
          screenOptions={{
            headerShown: false,
            gestureDirection: 'vertical',
            
      }}
      initialRouteName={ROUTES.JADWAL}
    >
      <Stack.Screen name={ROUTES.JADWAL} component={JadwalScreen} />
      <Stack.Screen name={ROUTES.KATEGORY_JADWAL_SCREEN} component={KategoriJadwalScreen} options={
          {
            headerMode:'screen',
            headerShown:false,
            presentation: 'transparentModal',
            cardStyle: {
              backgroundColor: 'transparent',
            },
            transitionSpec: {
              open: openSring,
              close: closeSring
            },
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }
      } />
    </Stack.Navigator>
  )
}
export default JadwalNavigator